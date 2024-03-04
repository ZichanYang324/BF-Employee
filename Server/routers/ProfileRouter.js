import {
  createProfile,
  getProfile,
  getProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";

const profileRouter = Router();

<<<<<<< HEAD
profileRouter.post("/getProfile", getProfile);
profileRouter.post("/createProfile", createProfile);
profileRouter.post("/getProfileStatus", getProfileStatus);
profileRouter.put("/updateProfileStatus", updateProfileStatus);
=======
const logRequestData = (req, res, next) => {
  console.log("Request body:", req.body);
  console.log("req.files", req.files);
  next();
};
profileRouter.post("/createProfile", logRequestData, createProfile);
profileRouter.post("/getProfile", getProfile);
//use by send get to /profile/getProfileStatus?userId=21391273943527
profileRouter.get("/getProfileStatus", getProfileStatus);
>>>>>>> 1d15dc99da34dcbb7880517315f6e53d246c5f54

export default profileRouter;
