import {
  getMyDocuments,
  updateDocumentStatus,
  uploadDocumentbc,
  login,
  getAllDocuments,
  getEmployees,
  downloadDocument,
  sendNotification
} from "../controllers/DocumentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";
import express from "express";

// const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

//router.post("/upload", authenticate, upload.single('file'),uploadDocument);
//router.post("/upload", uploadDocument);
router.post(
  "/upload",
  authenticate,
  uploadDocumentbc,
);
// update document status (for HR)
router.patch(
  "/:documentId/status",
  authenticate,
  checkHRRole,
  updateDocumentStatus,
);
router.get("/my",authenticate, getMyDocuments);
router.get("/all", authenticate, checkHRRole, getAllDocuments);
// router.post('/register', register);
router.post('/login', login);
router.get("/employees", authenticate, checkHRRole, getEmployees);
router.get('/download/:documentId', authenticate, downloadDocument);
router.post('/sendNotification/:documentId', authenticate, checkHRRole, sendNotification);

router.get("/testAuth", authenticate, (req, res) => {
  res.json(req.user);
});

export default router;
