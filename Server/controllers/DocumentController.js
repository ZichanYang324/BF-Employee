import Document from "../models/Document.model.js";
import User from "../models/User.model.js";
// exports.uploadDocument = async (req, res) => {
//   // upload to a storage services..
// };
import  uploadFileToS3  from '../s3Service.js';
async function uploadDocument(req, res) {
  const userId = req.user._id;
  const { documentType, file } = req.body;

  if (!(await canUploadNextDocument(userId, documentType))) {
    return res
      .status(403)
      .json({
        message: "You must wait for the previous document to be approved.",
      });
  }

  try {
    const s3Response = await uploadFileToS3(
      file.buffer,
      file.originalname,
      process.env.AWS_S3_BUCKET_NAME,
    );

    const newDocument = await Document.create({
      owner: userId,
      type: documentType,
      status: "Pending",
      URL: s3Response.url,
      S3Bucket: s3Response.bucket,
      S3Name: s3Response.key,
    });

    res
      .status(201)
      .json({
        message: "Document uploaded successfully",
        document: newDocument,
      });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Failed to upload document" });
  }
};
  async function  updateDocumentStatus(req, res){
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
    res
      .status(500)
      .json({
        message: "An error occurred while updating the document status.",
      });
  }
};

async function getMyDocuments (req, res){
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
};
export default {
  uploadDocument,
  updateDocumentStatus,
  getMyDocuments,
};