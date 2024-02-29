import FacilityReportModel from "../models/FacilityReport.model.js";
import Housing from "../models/Housing.model.js";
import Profile from "../models/Profile.model.js";
import UserModel from "../models/User.model.js";

// number of reports per page
const MAX_ITEM_PERPAGE = 3;

/**
 * Get housing details for current user
 * @param {profileId}
 * @returns {address, houseId [{assignedEmployees.name,phoneNumber}]} address and roommate info
 */

export const getHousingDetailsForEmployee = async (req, res) => {
  const { profileId } = req.body;
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json("Profile not found");
    }
    const housingDetails = await Housing.findOne({
      assignedEmployees: profileId,
    })
      .populate({
        path: "assignedEmployees",
        model: "Profile",
        select: "firstName lastName preferredName cellPhone",
      })
      .exec();
    if (!housingDetails) {
      return res
        .status(404)
        .json("Housing Info does not exist for current employee");
    }
    const res_details = {
      address: housingDetails.address,
      houseId: housingDetails._id,
      assignedEmployees: housingDetails.assignedEmployees.map((employee) => ({
        fullName:
          employee.preferredName ||
          `${employee.firstName} ${employee.lastName}`,
        phone: employee.cellPhone,
      })),
    };

    return res.status(200).json(res_details);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        `error when fetching Housing details for current employee - ${error}`,
      );
  }
};

/**
 * Adding house as HR
 * @param {profileId, address,landlordInfo,facilityDetails,pagination}
 * @returns {Housing} newly added house
 */

export const addHouseForHR = async (req, res) => {
  try {
    const { profileId, address, landlordInfo, facilityDetails } = req.body;
    const user = await UserModel.findOne({ profile: profileId }).exec();
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.role !== "HR") {
      return res.status(401).json("Permission denied");
    }

    const newHouse = await Housing.create({
      address: address,
      landlordInfo: landlordInfo,
      facilityDetails: facilityDetails,
    });

    return res.status(201).json(newHouse);
  } catch (error) {
    console.error(error);
    return res.status(500).json(`error when creating a House- ${error}`);
  }
};

/**
 * delete a house as HR
 * @param {profileId, houseID}
 * @returns {deletedHouse} deleted house
 */

export const deleteHouseForHR = async (req, res) => {
  try {
    const { profileId, houseID } = req.body;
    const user = await UserModel.findOne({ profile: profileId }).exec();
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.role !== "HR") {
      return res.status(401).json("Permission denied");
    }

    const deletedHouse = await Housing.findByIdAndDelete(houseID);
    if (!deletedHouse) {
      return res.status(404).json("House not found");
    }
    return res.status(200).json(deletedHouse);
  } catch (error) {
    console.error(error);
    return res.status(500).json(`error when deleting a House- ${error}`);
  }
};

/**
 * Get basic information for all houses as HR
 * @param {ProfileId}
 * @returns {[address, Landlord, NumberofEmployee]} houses' basic infomation
 */

export const getAllBasicHouseInfoForHR = async (req, res) => {
  try {
    const { profileId } = req.body;
    const user = await UserModel.findOne({ profile: profileId }).exec();
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.role !== "HR") {
      return res.status(401).json("Permission denied");
    }
    const houses = await Housing.find();
    if (houses.length === 0) {
      return res.status(200).json([]);
    }
    const responeBody = houses.map((el) => ({
      address: el.address,
      landlordInfo: el.landlordInfo,
      NumberofEmployee: el.assignedEmployees.length,
    }));
    return res.status(200).json(responeBody);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`error when getting basic info for current House- ${error}`);
  }
};

/**
 * Get summary information for selected House as HR
 * body @param {ProfileId}
 * query @param {houseID, page}
 * @returns {facilityInfo, FacilityReports, Comments, EmployeesInfo}
 */

export const getHouseSummaryForHR = async (req, res) => {
  try {
    const { profileId } = req.body;
    const user = await UserModel.findOne({ profile: profileId }).exec();
    // check if user exists
    if (!user) {
      return res.status(404).json("User not found");
    }
    // check if user is HR
    if (user.role !== "HR") {
      return res.status(401).json("Permission denied");
    }

    const { page = 1, houseID = null } = req.query;

    if (!houseID) {
      return res.status(404).json("houseID not found");
    }

    const house = await Housing.findById(houseID)
      .populate({
        path: "assignedEmployees",
        model: "Profile",
        select: "firstName lastName preferredName cellPhone email car",
      })
      .exec();
    // check if house exists
    if (!house) {
      return res.status(404).json("House not found");
    }
    // Facility Informatio Number of beds, mattresses, tables, chairs
    const facilityInfo = {
      bed: house.facilityDetails.beds,
      mattresses: house.facilityDetails.mattresses,
      tables: house.facilityDetails.tables,
      chairs: house.facilityDetails.chairs,
    };
    // Facility reports for that house
    let report = [];

    const pageNum = Math.max(1, parseInt(page));
    const totalItem = await FacilityReportModel.countDocuments({
      houseID: houseID,
    });
    const totalPage = Math.ceil(totalItem / MAX_ITEM_PERPAGE);

    const facilityReport = await FacilityReportModel.find({ houseID: houseID })
      .skip((pageNum - 1) * MAX_ITEM_PERPAGE)
      .limit(MAX_ITEM_PERPAGE)
      .populate({
        path: "comments",
        model: "Comment",
        select: "createdby description timestamp",
      })
      .populate({
        path: "createdBy",
        model: "Profile",
        select: "firstName lastName preferredName",
      })
      .exec();

    if (facilityReport.length !== 0) {
      report = facilityReport.map((report) => ({
        title: report.title,
        description: report.description,
        createdBy:
          report.createdBy.preferredName ||
          `${report.createdBy.firstName} ${report.createdBy.lastName}`,
        status: report.status,
        timestamp: report.timestamp,
        comments: report.comments,
      }));
    }

    // Employee Information
    const employeeInfo = house.assignedEmployees.map((employee) => ({
      preferredName:
        employee.preferredName || `${employee.firstName} ${employee.lastName}`,
      phone: employee.cellPhone,
      email: employee.email,
      car: employee.car,
      id: employee._id,
    }));
    // Pagination Information
    const pagination = {
      totalItem,
      totalPage,
      currentPage: pageNum,
    };
    const houseSummary = {
      facilityInfo,
      facilityReports: report,
      employeeInfo,
      pagination,
    };

    return res.status(200).json(houseSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json(`error when creating a House- ${error}`);
  }
};
