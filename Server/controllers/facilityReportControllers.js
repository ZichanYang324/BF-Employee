import constants from "../config/constants.js";
import FacilityReport from "../models/FacilityReport.model.js";
import Housing from "../models/Housing.model.js";

/**
 * Get housing reports for current user
 * @param {profileId}
 * @returns {FacilityReport} all reports belongs to current employee
 */

export const getReportForEmployee = async (req, res) => {
  const { profileId } = req.body;
  try {
    const reports = await FacilityReport.find({
      createdBy: profileId,
    })
      .populate({
        path: "createdBy",
        model: "Profile",
        select: "firstName lastName preferredName",
      })
      .exec();
    if (!reports || reports.length === 0) {
      return res.status(404).json("report not found");
    }
    return res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`error when fetching reports for employee -${error}`);
  }
};

/**
 * Create a facility report for current house
 * @param {profileId,houseID,title,description}
 * @returns {FacilityReport} newly created facility report
 */

export const createReportForEmployee = async (req, res) => {
  try {
    const { profileId, houseID, title, description } = req.body;
    const house = await Housing.findById(houseID);
    if (!house) {
      return res.status(404).json("House not found");
    }
    const newReport = {
      houseID,
      title,
      description,
      createdBy: profileId,
      status: constants.facilityReportStatus[0],
    };
    const report = await FacilityReport.create(newReport);
    house.reports.push(report._id);
    await house.save();

    return res.status(201).json(report);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`error when creating report for employee -${error}`);
  }
};
