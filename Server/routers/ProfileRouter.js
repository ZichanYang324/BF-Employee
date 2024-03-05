import {
  createProfile,
  getProfile,
  getProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";

const profileRouter = Router();

const logRequestData = (req, res, next) => {
  console.log("Request body:", req.body);
  console.log("req.files", req.files);
  next();
};

profileRouter.post("/createProfile", protect, createProfile);
profileRouter.post("/getProfile", protect, getProfile);
profileRouter.get("/getProfileStatus", protect, getProfileStatus);

export default profileRouter;
