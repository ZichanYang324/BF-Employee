import User from "../models/User.model.js";
import { Document } from "../models/index.js";
import { getOneFilePresignedUrl } from "../utils/s3.js";

export async function summary(req, res) {
  const { search = "" } = req.query;

  try {
    const employees = await User.aggregate([
      {
        $lookup: {
          // populate
          from: "profiles",
          localField: "profile",
          foreignField: "_id",
          as: "profile",
        },
      },
      {
        // unwind profile array
        $unwind: "$profile",
      },
      {
        $match: {
          role: "EMPLOYEE", // filter
          $or: [
            // search
            "profile.firstName",
            "profile.lastName",
            "profile.preferredName",
          ].map((field) => ({ [field]: { $regex: search, $options: "i" } })),
        },
      },
      {
        $project: {
          // select
          userId: "$_id",
          firstName: "$profile.firstName",
          middleName: "$profile.middleName",
          lastName: "$profile.lastName",
          SSN: "$profile.SSN",
          workAuthTitle: "$profile.workAuth.title",
          phoneNumber: "$profile.cellPhone",
          email: 1,
        },
      },
    ]).exec();

    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

export async function entireProfile(req, res) {
  const { userId } = req.query;
  try {
    const employee = await User.findOne({ role: "EMPLOYEE", _id: userId })
      .populate({
        path: "profile",
        populate: [
          "profilePic",
          "driversLicense.document",
          "OPTReceipt.document",
          "OPTEAD.document",
          "I983.document",
          "I20.document",
        ],
      })
      .select("-password")
      .lean()
      .exec();

    if (!employee) {
      return res.status(404).json("Employee not found");
    }
    const presignedUrls = await _getPresignedUrls({
      profile: employee.profile,
      userId,
    });
    const result = {
      userId,
      ...{
        ...employee.profile,
        DOB: _formatDate(employee.profile.DOB),
        workAuth: employee.profile.workAuth && {
          ...employee.profile.workAuth,
          startDate: _formatDate(employee.profile.workAuth.startDate),
          endDate: _formatDate(employee.profile.workAuth.endDate),
        },
        profilePic: presignedUrls.profilePic,
        driversLicense: employee.profile.driversLicense && {
          ...employee.profile.driversLicense,
          expiration: _formatDate(employee.profile.driversLicense.expiration),
          url: presignedUrls.driversLicense,
        },
        OPTReceipt: employee.profile.OPTReceipt && {
          ...employee.profile.OPTReceipt,
          url: presignedUrls.OPTReceipt,
        },
        OPTEAD: employee.profile.OPTEAD && {
          ...employee.profile.OPTEAD,
          url: presignedUrls.OPTEAD,
        },
        I983: employee.profile.I983 && {
          ...employee.profile.I983,
          url: presignedUrls.I983,
        },
        I20: employee.profile.I20 && {
          ...employee.profile.I20,
          url: presignedUrls.I20,
        },
        email: employee.email,
      },
    };
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

async function _getPresignedUrls({ profile, userId }) {
  let profilePic = profile.profilePic;
  let driversLicense = profile.driversLicense?.document;
  let OPTReceipt = profile.OPTReceipt?.document;
  if (!OPTReceipt) {
    OPTReceipt = await Document.findOne({
      owner: userId,
      type: "OPT Receipt",
    })
      .lean()
      .exec();
  }
  let OPTEAD = profile.OPTEAD?.document;
  if (!OPTEAD) {
    OPTEAD = await Document.findOne({
      owner: userId,
      type: "OPT EAD",
    })
      .lean()
      .exec();
  }
  let I983 = profile.I983?.document;
  if (!I983) {
    I983 = await Document.findOne({
      owner: userId,
      type: "I-983",
    })
      .lean()
      .exec();
  }
  let I20 = profile.I20?.document;
  if (!I20) {
    I20 = await Document.findOne({
      owner: userId,
      type: "I-20",
    })
      .lean()
      .exec();
  }

  const urlsRes = await Promise.all([
    profilePic ? getOneFilePresignedUrl({ Key: profilePic.S3Name }) : null,
    driversLicense
      ? getOneFilePresignedUrl({ Key: driversLicense.S3Name })
      : null,
    OPTReceipt ? getOneFilePresignedUrl({ Key: OPTReceipt.S3Name }) : null,
    OPTEAD ? getOneFilePresignedUrl({ Key: OPTEAD.S3Name }) : null,
    I983 ? getOneFilePresignedUrl({ Key: I983.S3Name }) : null,
    I20 ? getOneFilePresignedUrl({ Key: I20.S3Name }) : null,
  ]);

  return {
    profilePic: urlsRes[0]?.data,
    driversLicense: urlsRes[1]?.data,
    OPTReceipt: urlsRes[2]?.data,
    OPTEAD: urlsRes[3]?.data,
    I983: urlsRes[4]?.data,
    I20: urlsRes[5]?.data,
  };
}

function _formatDate(date) {
  if (!date) return undefined;
  return date.toISOString().split("T")[0];
}
