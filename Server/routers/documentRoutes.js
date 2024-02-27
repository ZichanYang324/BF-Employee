import {
  getMyDocuments,
  login,
  register,
  updateDocumentStatus,
  uploadDocument,
} from "../controllers/DocumentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", authenticate, upload.single("file"), uploadDocument);
//router.post("/upload", uploadDocument);
router.post("/register", register);
router.post("/login", login);
router.get("/testAuth", authenticate, (req, res) => {
  res.json(req.user);
});
// update document status (for HR)
router.patch(
  "/:documentId/status",
  authenticate,
  checkHRRole,
  updateDocumentStatus,
);

// get user's documents
router.get("/my", authenticate, getMyDocuments);
//router.get("/my", authenticate, getMyDocuments);

export default router;
