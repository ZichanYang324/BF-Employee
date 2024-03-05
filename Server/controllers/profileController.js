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
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString(),
  );
  const userId = tokenPayload.userId;
  const user = await User.findById(userId);

  //create profile
  // await Profile.create
  let newProfile = {
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    preferredName: preferredName,
    gender: gender,
    cellPhone: cellPhone,
    workPhone: workPhone,
    address: address,
    car: car,
    SSN: SSN,
    DOB: DOB,
    immigrationStatus: immigrationStatus,
    workAuth: workAuth,
    driversLicense: driversLicense,
    reference: reference,
    emergencyContacts: emergencyContacts,
    applicationStatus: "PENDING",
  };

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
    console.log("s3Response", s3Response);
    const newProfilePic = await Document.create({
      URL: s3Response.Location,
      S3Bucket: s3Response.Bucket,
      S3Name: s3Response.Key,
      type: "Profile Picture",
      owner: userId,
    });
    newProfile.profilePic = newProfilePic._id;
  }

  if (optReceiptFile) {
    const file = optReceiptFile;
    const s3Response = await uploadFileToS3(file.buffer, file.originalname);
    const newOptReceipt = await Document.create({
      URL: s3Response.Location,
      S3Bucket: s3Response.Bucket,
      S3Name: s3Response.Key,
      type: "Opt Receipt",
      owner: userId,
    });
    newProfile.OPTReceipt = newOptReceipt._id;
  }

  if (driverlicenseFile) {
    const file = driverlicenseFile;
    const s3Response = await uploadFileToS3(file.buffer, file.originalname);
    const newDriverLicense = await Document.create({
      URL: s3Response.Location,
      S3Bucket: s3Response.Bucket,
      S3Name: s3Response.Key,
      type: "Driver License",
      owner: userId,
    });
    newProfile.driversLicense = newDriverLicense._id;
  }
  const createdProfile = await Profile.create(newProfile);
  user.profile = createdProfile;
  user.save();
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

  if (user?.profile) {
    const profile = await Profile.findById(user.profile._id);
    return res.status(200).json({ status: profile.applicationStatus });
  } else {
    return res.status(200).json({ status: "NOT_STARTED" });
  }
};
