import { uploadFileToS3 } from "../config/s3Service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Document, Profile } from "../models/index.js";

export const createProfile = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    preferredName,
    gender,
    cellPhone,
    workPhone,
    address,
    car,
    SSN,
    DOB,
    immigrationStatus,
    workAuth,
    driversLicense,
    reference,
    emergencyContacts,
  } = JSON.parse(req.body.data);

  // if (immigrationStatus.type === "VISA" && !workAuth) {
  //   return res.status(400).json({
  //     message: "Work authorization is required",
  //   });
  // }

  const newProfile = await Profile.create({
    firstName,
    lastName,
    middleName,
    preferredName,
    gender,
    cellPhone,
    workPhone,
    address,
    car,
    SSN,
    DOB,
    immigrationStatus,
    workAuth,
    driversLicense,
    reference,
    emergencyContacts,
    applicationStatus: "PENDING",
  });

  if (req.files["profilePic"]) {
    const file = req.files["profilePic"][0];
    const s3Response = await uploadFileToS3(file.buffer, file.originalname);
    console.log(s3Response);
    const newProfilePic = await Document.create({
      URL: s3Response.url,
      S3Bucket: s3Response.bucket,
      S3Name: s3Response.key,
      // owner: req.user._id,
    });
    newProfile.profilePic = newProfilePic._id;
  }

  if (req.files["optReceipt"]) {
    const file = req.files["optReceipt"][0];
    const s3Response = await uploadFileToS3(file.buffer, file.originalname);
    const newOptReceipt = await Document.create({
      URL: s3Response.url,
      S3Bucket: s3Response.bucket,
      S3Name: s3Response.key,
      // owner: req.user._id,
    });
    newProfile.optReceipt = newOptReceipt._id;
  }

  if (req.files["driverlicense"]) {
    const file = req.files["driverlicense"][0];
    const s3Response = await uploadFileToS3(file.buffer, file.originalname);
    const newDriverLicense = await Document.create({
      URL: s3Response.url,
      S3Bucket: s3Response.bucket,
      S3Name: s3Response.key,
      // owner: req.user._id,
    });
    newProfile.driverLicense = newDriverLicense._id;
  }

  return res.status(201).send(newProfile);
});

export const getProfile = async (req, res) => {
  const user = req.user;
  const profile = await Profile.findById(user.profile?._id);
  if (!profile) {
    return res.status(404).send("Profile not found");
  }
  return res.status(200).send(profile);
};

export const getProfileStatus = async (req, res) => {
  const user = req.user;
  const profile = await Profile.findById(user.profile?._id);
  const status = profile.applicationStatus;
  return res.status(200).json({ status });
};

