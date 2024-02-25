import {
  createProfile,
  getProfile,
  getProfileStatus,
  updateProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";

const profileRouter = Router();

profileRouter.post("/getProfile", getProfile);
profileRouter.post("/createProfile", createProfile);
profileRouter.post("/getProfileStatus", getProfileStatus);
profileRouter.put("/updateProfileStatus", updateProfileStatus);

export default profileRouter;
