import {
  createProfile,
  getProfile,
  getProfileStatus,
  updateProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";
// import multer from "multer";

const profileRouter = Router();
// const upload = multer({ dest: "uploads/" });
const profileUpload = (req,res,next) => {
  const { profilePic, optReceipt, driverlicense } = req.body;
  console.log('profilePic:', profilePic);
  console.log('optReceipt:', optReceipt);
  console.log('driverlicense:', driverlicense);
  // upload.fields([
  //   { name: "profilePic", maxCount: 1 },
  //   { name: "optReceipt", maxCount: 1 },
  //   { name: "driverlicense", maxCount: 1 }
  // ]);
  next()
}
// const profileUpload = upload.fields([
//   { name: "profilePic", maxCount: 1 },
//   { name: "optReceipt", maxCount: 1 },
//   { name: "driverlicense", maxCount: 1 }
// ]);

const logRequestData = (req, res, next) => {
  console.log("Request body:", req.body); 
  next(); 
};
profileRouter.post("/createProfile", logRequestData, profileUpload, createProfile);
profileRouter.post("/getProfile", getProfile);
profileRouter.post("/getProfileStatus", getProfileStatus);
profileRouter.put("/updateProfileStatus", updateProfileStatus);

export default profileRouter;
