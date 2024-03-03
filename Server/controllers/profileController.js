import { uploadFileToS3 } from "../config/s3Service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Document, Profile, User } from "../models/index.js";

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
  const token = req.headers["authorization"].split(" ")[1];
  const tokenPayload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString(),
  );
  const userId = tokenPayload.userId;
  const user = await User.findById(userId);

  //create profile

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

  user.profile = newProfile;
  user.save();

  const profilePicFile = req.files.filter(
    (item) => item.fieldname === "profilePic",
  )[0];
  const optReceiptFile = req.files.filter(
    (item) => item.fieldname === "optReceipt",
  )[0];
  const driverlicenseFile = req.files.filter(
    (item) => item.fieldname === "driverlicense",
  )[0];
  console.log("profilePicFile", profilePicFile);

  if (profilePicFile) {
    const file = profilePicFile;
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

  if (optReceiptFile) {
    const file = optReceiptFile;
    const s3Response = await uploadFileToS3(file.buffer, file.originalname);
    const newOptReceipt = await Document.create({
      URL: s3Response.url,
      S3Bucket: s3Response.bucket,
      S3Name: s3Response.key,
      // owner: req.user._id,
    });
    newProfile.optReceipt = newOptReceipt._id;
  }

  if (driverlicenseFile) {
    const file = driverlicenseFile;
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

export const updateProfileStatus = async (req, res) => {
  const user = req.user;
  const profile = await Profile.findById(user.profile?._id);
  const { status } = req.body;
  profile.applicationStatus = status;
  await profile.save();
  return res.status(200).send(profile);
};
