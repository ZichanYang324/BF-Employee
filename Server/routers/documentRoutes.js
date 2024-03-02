import {
  getMyDocuments,
  updateDocumentStatus,
  uploadDocumentbc,
  login,
  register,
  getAllDocuments
} from "../controllers/DocumentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";
import multer from 'multer';
import express from 'express'
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();


router.post("/upload", authenticate, upload.single('file'), (req, res, next) => {
  console.log("Multer Debug - req.file:", req.file);
  console.log("Multer Debug - req.body:", req.body);
  next();
}, uploadDocumentbc);
// update document status (for HR)
router.patch(
  "/:documentId/status",
  authenticate,
  checkHRRole,
  updateDocumentStatus,
);
router.get("/my",authenticate, getMyDocuments);
router.get("/all", authenticate, checkHRRole, getAllDocuments);
router.post('/register', register);
router.post('/login', login);
router.get("/testAuth", authenticate, (req, res) => {
  res.json(req.user);
});

export default router;
