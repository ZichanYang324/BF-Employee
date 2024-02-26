import Comment from "../models/Comment.model.js";
import FacilityReport from "../models/FacilityReport.model.js";
import Profile from "../models/Profile.model.js";
import UserModel from "../models/User.model.js";

/**
 * Create a comment for current housing
 * @param {profileId,reportID, description}
 * @returns {Comment} newly created comment
 */

export const createComment = async (req, res) => {
  try {
    const { profileId, reportID, description } = req.body;
    const report = await FacilityReport.findById(reportID);
    if (!report) {
      return res.status(404).json("Facility Report not found");
    }
    const userProfile = await Profile.findById(profileId);
    if (!userProfile) {
      return res.status(404).json("Profile not found");
    }
    const newComment = {
      reportID: reportID,
      createdby: profileId,
      description,
    };
    const savedComment = await Comment.create(newComment);

    report.comments.push(savedComment._id);
    await report.save();

    // Return the newly created comment as a response
    return res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`Error when adding comment to report - ${error}`);
  }
};

/**
 * update a comment
 * @param { profileId, commentId, description }
 * @returns {Comment} updated a comment for current report
 */

export const updateComment = async (req, res) => {
  try {
    const { profileId, commentId, description } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json("Facility Report not found");
    }
    if (comment.createdby.toString() !== profileId.toString()) {
      return res.status(401).json("Permission denied");
    }
    comment.description = description;
    comment.timestamp = new Date();
    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    return res
      .status(500)
      .json(`Error when updating report comments - ${error}`);
  }
};

/**
 * get all comments for current report
 * @param {reportID}
 * @returns {Comment} all comments for current report
 */

export const getReportComments = async (req, res) => {
  try {
    const { profileId, reportID } = req.body;

    // Check if the FacilityReport exists
    const report = await FacilityReport.findById(reportID).populate({
      path: "comments",
      populate: { path: "createdby", model: "Profile" },
    });

    if (!report) {
      return res.status(404).json("Facility Report not found");
    }
    const User = await UserModel.find({ profile: profileId }).exec();

    if (
      report.createdBy._id.toString() !== profileId.toString() &&
      User.role !== "HR"
    ) {
      return res.status(401).json("Permission denied");
    }

    // Return the list of comments for the specified report
    return res.status(200).json(report.comments);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`Error when getting report comments - ${error}`);
  }
};
