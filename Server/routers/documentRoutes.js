import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";
import DocumentController from "../controllers/DocumentController.js";

// upload a document
router.post("/upload", authenticate, DocumentController.uploadDocument);

// update document status (for HR)
router.patch(
  "/:documentId/status",
  authenticate,
  checkHRRole,
  DocumentController.updateDocumentStatus,
);

// get user's documents
router.get("/my", authenticate, DocumentController.getMyDocuments);

export default router;
