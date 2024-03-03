import {
  createProfile,
  getProfile,
  getProfileStatus,
  updateProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";

const profileRouter = Router();

const logRequestData = (req, res, next) => {
  console.log("Request body:", req.body); 
  console.log('req.files',req.files)
  next(); 
};
profileRouter.post("/createProfile", logRequestData, createProfile);
profileRouter.post("/getProfile", getProfile);
//use by send get to /profile/getProfileStatus?userId=21391273943527
profileRouter.get("/getProfileStatus", getProfileStatus);
profileRouter.put("/updateProfileStatus", updateProfileStatus);

export default profileRouter;
