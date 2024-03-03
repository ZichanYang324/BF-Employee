import {
  createProfile,
  getProfile,
  getProfileStatus,
  updateProfileStatus,
} from "../controllers/profileController.js";
import { Router } from "express";
import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// import multer from "multer";

const profileRouter = Router();
// const upload = multer({ dest: "uploads/" });
const profileUpload = (req,res,next) => {
  const files = req.files;

  files.forEach((file) => {
    const formatList = file.originalname.split('.')
    console.log('formatList',formatList)
    const format = formatList[formatList.length-1]
    const filePath = path.join(__dirname, `../uploads/${file.fieldname}.${format}`);
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(`Failed to upload ${file.fieldname}`);
      }
    });
  });

  next()
}
// const profileUpload = upload.fields([
//   { name: "profilePic", maxCount: 1 },
//   { name: "optReceipt", maxCount: 1 },
//   { name: "driverlicense", maxCount: 1 }
// ]);

const logRequestData = (req, res, next) => {
  console.log("Request body:", req.body); 
  console.log('req.files',req.files)
  next(); 
};
profileRouter.post("/createProfile", logRequestData, profileUpload, createProfile);
profileRouter.post("/getProfile", getProfile);
profileRouter.post("/getProfileStatus", getProfileStatus);
profileRouter.put("/updateProfileStatus", updateProfileStatus);

export default profileRouter;
