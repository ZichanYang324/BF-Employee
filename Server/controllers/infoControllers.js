import ProfileModel from "../models/Profile.model.js";
import User from "../models/User.model.js";
import { getOneFilePresignedUrl } from "../utils/s3.js";

export async function getProfile(req, res) {
  let userId = req.user?._id;

  if (!userId) {
    return res.status(400).json("Invalid request");
  }

  try {
    const user = await User.findById(userId)
      .populate({ path: "profile", populate: { path: "profilePic" } })
      .select("-password")
      .exec();
    if (!user) {
      return res.status(404).json("User not found");
    }
    const userProfile = user.toObject();
    console.log(userProfile);
    if (userProfile.profile.profilePic != null) {
      const { data: url } = await getOneFilePresignedUrl({
        Key: userProfile.profile.profilePic.S3Name,
      });
      userProfile.profile.profilePic.url = url;
    }
    userProfile.profile.DOB =
      userProfile.profile.DOB.toISOString().split("T")[0];
    userProfile.profile.workAuth.startDate =
      userProfile.profile.workAuth.startDate.toISOString().split("T")[0];
    userProfile.profile.workAuth.endDate = userProfile.profile.workAuth.endDate
      .toISOString()
      .split("T")[0];

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

export async function getDocuments(req, res) {
  const user = req.user;

  if (user == null || user._id == null) {
    return res.status(400).json("Invalid request");
  }

  try {
    const profile = await ProfileModel.findById(user.profile)
      .select("driversLicense OPTReceipt OPTEAD I983 I20")
      .populate(
        "driversLicense.document OPTReceipt.document OPTEAD.document I983.document I20.document",
      )
      .exec();
    const documentUrls = await _getDocumentUrls(profile);
    res.status(200).json(documentUrls);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

async function _getDocumentUrls(profile) {
  const profileDocuments = Object.entries(profile.toObject());
  const documentKeys = profileDocuments
    .filter(([key]) => key !== "_id")
    .map(([docType, value]) => {
      const s3Key = value?.document?.S3Name;
      return [docType, s3Key];
    });
  const documentUrls = await Promise.all(
    documentKeys.map(async ([docType, s3Key]) => {
      const { data: url, error } = await getOneFilePresignedUrl({
        Key: s3Key,
      });
      if (error) {
        console.error(error);
        return [docType, null];
      }
      return [docType, { s3Key, url }];
    }),
  );
  return documentUrls;
}

const SECTIONS = [
  "name",
  "address",
  "contact",
  "employment",
  "emergencyContacts",
];

export async function update(req, res) {
  const user = req.user;
  const section = req.params.section;

  if (user == null || user._id == null || !SECTIONS.includes(section)) {
    return res.status(400).json("Invalid request");
  }

  try {
    const profile = await ProfileModel.findById(user.profile).exec();
    if (!profile) {
      return res.status(404).json("Profile not found");
    }

    if (section === "name") {
      await _updateName({ userId: user._id });
    } else if (section === "address") {
      const { address } = req.body;
      await _updateAddress({ profileId: profile._id, address });
    } else if (section === "contact") {
      const { cellPhone, workPhone } = req.body;
      await _updateContact({ profileId: profile._id, cellPhone, workPhone });
    } else if (section === "employment") {
      const { workAuth } = req.body;
      await _updateEmployment({ profileId: profile._id, workAuth });
    } else if (section === "emergencyContacts") {
      const { emergencyContacts } = req.body;
      await _updateEmergencyContacts({
        profileId: profile._id,
        emergencyContacts,
      });
    } else {
      return res.status(400).json("Invalid request");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

async function _updateName({
  userId,
  firstName,
  lastName,
  middleName,
  preferredName,
  profilePic,
  email,
  SSN,
  DOB,
  gender,
}) {
  // TODO
  return;
}

async function _updateAddress({ profileId, address }) {
  const profile = await ProfileModel.updateOne(
    { _id: profileId },
    {
      address,
    },
  ).exec();
  return profile;
}

async function _updateContact({ profileId, cellPhone, workPhone }) {
  const profile = await ProfileModel.updateOne(
    { _id: profileId },
    {
      cellPhone,
      workPhone,
    },
  ).exec();
  return profile;
}

async function _updateEmployment({ profileId, workAuth }) {
  const profile = await ProfileModel.updateOne(
    { _id: profileId },
    {
      workAuth,
    },
  ).exec();
  return profile;
}

async function _updateEmergencyContacts({ profileId, emergencyContacts }) {
  const profile = await ProfileModel.updateOne(
    { _id: profileId },
    {
      emergencyContacts,
    },
  ).exec();
  return profile;
}
