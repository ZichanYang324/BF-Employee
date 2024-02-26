import Document from "../models/Document.model.js";
import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// exports.uploadDocument = async (req, res) => {
//   // upload to a storage services..
// };
import uploadFileToS3 from "../s3Service.js";
const documentOrder = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

async function canUploadNextDocument(userId, documentType) {
  const currentIndex = documentOrder.indexOf(documentType);
  console.log(currentIndex);
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

async function uploadDocument(req, res) {
  console.log(req.body);
  const userId = req.user._id;
  const { documentType, file } = req.body;
  console.log("Received documentType:", documentType);

  if (!(await canUploadNextDocument(userId, documentType))) {
    return res.status(403).json({
      message: "You must wait for the previous document to be approved.",
    });
  }

  try {
    // const s3Response = await uploadFileToS3(
    //   file.buffer,
    //   file.originalname,
    //   process.env.AWS_S3_BUCKET_NAME,
    // );

    const newDocument = await Document.create({
      owner: userId,
      type: documentType,
      status: "Pending",
      URL: "s3Response.url",
      S3Bucket: "s3Response.bucket",
      S3Name: "s3Response.key",
      // URL: s3Response.url,
      // S3Bucket: s3Response.bucket,
      // S3Name: s3Response.key,
    });

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
    // sendNotification(document.owner, "Your document status has been updated.");

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
    const documents = await Document.find({ owner: userId });

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

async function register (req, res) {
  try {
    const { username, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 8);

    const user = new User({ username, email, passwordHash });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token: token,
      isAdmin: user.isAdmin 
  });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { register, login, uploadDocument, updateDocumentStatus, getMyDocuments };
