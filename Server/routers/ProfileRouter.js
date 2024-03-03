import {
  createProfile,
  getProfile,
  getProfileStatus
} from "../controllers/profileController.js";
import { Router } from "express";
import multer from "multer";

const profileRouter = Router();
const upload = multer({ dest: "uploads/" });
const profileUpload = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "optReceipt", maxCount: 1 },
  { name: "driverlicense", maxCount: 1 },
]);

profileRouter.post("/createProfile", profileUpload, createProfile);
profileRouter.post("/getProfile", getProfile);
profileRouter.post("/getProfileStatus", getProfileStatus);

export default profileRouter;
