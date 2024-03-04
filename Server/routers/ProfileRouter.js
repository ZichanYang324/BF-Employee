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
profileRouter.post("/createProfile", logRequestData, createProfile);
profileRouter.post("/getProfile", getProfile);
//use by send get to /profile/getProfileStatus?userId=21391273943527
profileRouter.get("/getProfileStatus", protect ,getProfileStatus);

export default profileRouter;
