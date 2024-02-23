const Document = require('../models/Document.model');
const User = require('../models/User.model');

// exports.uploadDocument = async (req, res) => {
//   // upload to a storage services..
// };
const { uploadFileToS3 } = require('../services/s3Service');

exports.uploadDocument = async (req, res) => {
  const userId = req.user._id; 
  const { documentType, file } = req.body; 

  if (!(await canUploadNextDocument(userId, documentType))) {
    return res.status(403).json({ message: "You must wait for the previous document to be approved." });
  }

  try {
    const s3Response = await uploadFileToS3(file.buffer, file.originalname, process.env.AWS_S3_BUCKET_NAME);


    const newDocument = await Document.create({
      owner: userId,
      type: documentType,
      status: 'Pending',
      URL: s3Response.url,
      S3Bucket: s3Response.bucket,
      S3Name: s3Response.key,
    });

    res.status(201).json({ message: "Document uploaded successfully", document: newDocument });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Failed to upload document" });
  }
};

exports.updateDocumentStatus = async (req, res) => {
    const { status, feedback } = req.body;
    const { documentId } = req.params;
  
    try {
      const document = await Document.findByIdAndUpdate(documentId, {
        status,
        feedback,
      }, { new: true });
  
      if (!document) {
        return res.status(404).json({ message: "Document not found." });
      }
  
      // placeholder for notification logic
      // sendNotification(document.owner, "Your document status has been updated.");
  
      res.json({ message: "Document status updated successfully.", document });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the document status." });
    }
  };


exports.getMyDocuments = async (req, res) => {
  const userId = req.user._id;

  try {
    const documents = await Document.find({ owner: userId });

    if (!documents.length) {
      return res.status(404).json({ message: "No documents found." });
    }

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving documents." });
  }
};