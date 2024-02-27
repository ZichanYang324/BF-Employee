import express from "express";
const router = express.Router();
import {authenticate} from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";
import { register,login,uploadDocument, updateDocumentStatus, getMyDocuments } from "../controllers/DocumentController.js";
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });


router.post("/upload", authenticate, upload.single('file'),uploadDocument);
//router.post("/upload", uploadDocument);
router.post('/register', register);
router.post('/login', login);
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
router.get("/my",authenticate, getMyDocuments);
//router.get("/my", authenticate, getMyDocuments);

export default router;
