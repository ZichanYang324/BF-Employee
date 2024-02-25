import { Profile } from "../models";

export const createProfile = async (req, res) => {
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
  } = JSON.parse(req.body);

  if (immigrationStatus.type === "VISA" && !workAuth) {
    return res.status(400).json({
      message: "Work authorization is required",
    });
  }

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
  });

  return res.status(201).send(newProfile);
};

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
