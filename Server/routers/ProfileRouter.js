import {
  createProfile,
  getProfile,
  getProfileStatus,
  updateProfile
} from "../controllers/profileController.js";
import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";

const profileRouter = Router();

profileRouter.post("/createProfile", protect, createProfile);
profileRouter.put("/updateProfile", protect, updateProfile);
profileRouter.post("/getProfile", protect, getProfile);
profileRouter.get("/getProfileStatus", protect, getProfileStatus);

export default profileRouter;
