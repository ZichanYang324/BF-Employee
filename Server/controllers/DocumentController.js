import { downloadFileFromS3, uploadFileToS3 } from "../config/s3Service.js";
import Document from "../models/Document.model.js";
import User from "../models/User.model.js";
import { Profile } from "../models/index.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const documentOrder = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

async function canUploadNextDocument(userId, documentType) {
  const currentIndex = documentOrder.indexOf(documentType);
  // If it's the first document in the order, allow upload
  if (currentIndex === 0) {
    return true;
  }

  const previousDocumentType = documentOrder[currentIndex - 1];
  const previousDocument = await Document.findOne({
    owner: userId,
    type: previousDocumentType,
  }).sort({ createdAt: -1 }); // Assuming there's a createdAt field to get the latest

  // If the previous document exists and is approved, allow upload
  return previousDocument && previousDocument.status === "Approved";
}

async function uploadDocumentbc(req, res) {
  const userId = req.user._id;
  //const { documentType, file } = req.body;
  const { documentType } = req.body;
  if (!req.files) {
    return res
      .status(400)
      .json({ message: "No file uploaded or file is missing." });
  }
  if (!(await canUploadNextDocument(userId, documentType))) {
    return res.status(403).json({
      message: "You must wait for the previous document to be approved.",
    });
  }

  try {
    const thisFile = req.files[0];
    const s3Response = await uploadFileToS3(thisFile);
    const newDocument = await Document.create({
      owner: userId,
      type: documentType,
      status: "Pending",
      URL: s3Response.Location,
      S3Bucket: s3Response.Bucket,
      S3Name: s3Response.Key,
      feedback: "",
    });
    const user = await User.findById(userId).select("profile");
    const profile = await Profile.findById(user.profile);
    if (documentType === "OPT Receipt") {
      profile.OPTReceipt.document = newDocument._id;
    }
    if (documentType === "OPT EAD") {
      profile.OPTEAD.document = newDocument._id;
    }
    if (documentType === "I-983") {
      profile.I983.document = newDocument._id;
    }
    if (documentType === "I-20") {
      profile.I20.document = newDocument._id;
    }

    res.status(201).json({
      message: "Document uploaded successfully",
      document: newDocument,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Failed to upload document" });
  }
}
async function updateDocumentStatus(req, res) {
  const { status, feedback } = req.body;
  const { documentId } = req.params;

  try {
    const document = await Document.findByIdAndUpdate(
      documentId,
      {
        status,
        feedback,
      },
      { new: true },
    );

    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    // placeholder for notification logic
    //sendNotification(document.owner, "Your document status has been updated.");

    res.json({ message: "Document status updated successfully.", document });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the document status.",
    });
  }
}

async function getMyDocuments(req, res) {
  const userId = req.user._id;

  try {
    const documents = (await Document.find({ owner: userId })).filter(
      (item) =>
        item.type !== "Profile Picture" && item.type !== "Driver License",
    );

    if (!documents.length) {
      return res.status(404).json({ message: "No documents found." });
    }

    res.json(documents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving documents." });
  }
}

async function getAllDocuments(req, res) {
  try {
    const documents = await Document.find({})
      .populate({
        path: "owner",
        populate: {
          path: "profile",
          select: "workAuth firstName lastName middleName",
        },
      })
      .exec();

    if (!documents.length) {
      return res.status(404).json({ message: "No documents found." });
    }
    const transformedDocuments = documents
      .filter((doc) => !!doc.owner)
      .map((doc) => {
        const docObj = doc.toObject();
        if (docObj.owner && docObj.owner.profile) {
          docObj.owner.fullName = `${docObj.owner.profile.firstName}${docObj.owner.profile.middleName ? " " + docObj.owner.profile.middleName : ""} ${docObj.owner.profile.lastName}`;
          docObj.owner.workAuth = docObj.owner.profile.workAuth;
          delete docObj.owner.profile;
        }
        return docObj;
      });

    res.json(transformedDocuments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving all documents." });
  }
}
async function getEmployees(req, res) {
  const searchQuery = req.query.search;

  let query = {};

  if (searchQuery) {
    query = [
      {
        $lookup: {
          from: "profiles",
          localField: "profile",
          foreignField: "_id",
          as: "profileDetails",
        },
      },
      { $unwind: "$profileDetails" },
      {
        $match: {
          $or: [
            {
              "profileDetails.firstName": {
                $regex: searchQuery,
                $options: "i",
              },
            },
            {
              "profileDetails.lastName": { $regex: searchQuery, $options: "i" },
            },
            {
              "profileDetails.preferredName": {
                $regex: searchQuery,
                $options: "i",
              },
            },
          ],
        },
      },
      {
        $project: {
          fullName: {
            $concat: [
              "$profileDetails.firstName",
              " ",
              "$profileDetails.lastName",
            ],
          },
          workAuth: "$profileDetails.workAuth",
          email: 1,
          role: 1,
        },
      },
    ];
  }

  try {
    const employees = searchQuery
      ? await User.aggregate(query)
      : await User.find().populate("profile");

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found." });
    }

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving employees." });
  }
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.matchPassword(password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token: token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const downloadDocument = async (req, res) => {
  const { documentId } = req.params;
  try {
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).send("Document not found");
    }

    const downloadUrl = await downloadFileFromS3(document.S3Name);
    res.send(downloadUrl);
  } catch (error) {
    console.error("Error generating download URL:", error);
    res.status(500).send("Error generating download URL");
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app-specific password
  },
});
export const sendNotification = async (req, res) => {
  const { documentId } = req.params;
  try {
    const document = await Document.findById(documentId).populate("owner");
    if (!document) return res.status(404).send("Document not found");
    const user = document.owner;
    if (!user) return res.status(404).send("User not found for this document");

    const mailOptions = {
      from: "your-email@gmail.com", // Sender address
      to: user.email, // Recipient address
      subject: "Reminder: Next Steps for Your Visa Status Management",
      text: "This is a reminder to complete your next steps in the visa status management process.", // Plain text body
      html: "<p>This is a reminder to complete your next steps in the visa status management process.</p>", // HTML body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.send("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email notification");
  }
};
export {
  register,
  login,
  uploadDocumentbc,
  updateDocumentStatus,
  getMyDocuments,
  getAllDocuments,
  getEmployees,
  downloadDocument,
};
