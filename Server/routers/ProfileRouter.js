import {
  createProfile,
  getProfile,
  getProfileStatus,
  updateProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";
import multer from "multer";

const profileRouter = Router();
const upload = multer({ dest: "uploads/" });
const profileUpload = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "optReciept", maxCount: 1 },
  { name: "driverlicense", maxCount: 1 }
]);

profileRouter.post("/getProfile", profileUpload, getProfile);
profileRouter.post("/createProfile", createProfile);
profileRouter.post("/getProfileStatus", getProfileStatus);
profileRouter.put("/updateProfileStatus", updateProfileStatus);

export default profileRouter;
