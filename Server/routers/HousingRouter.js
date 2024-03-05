import {
  createComment,
  getReportComments,
  updateComment,
} from "../controllers/commentControllers.js";
import {
  createReportForEmployee,
  getReportForEmployee,
} from "../controllers/facilityReportControllers.js";
import {
  addEmpToHouse,
  addHouseForHR,
  assignHousing,
  deleteHouseForHR,
  getAllBasicHouseInfoForHR,
  getHouseSummaryForHR,
  getHousingDetailsForEmployee,
  getProfileIdFromUid,
} from "../controllers/housingControllers.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";

const housingRouter = express.Router();
const reportRouter = express.Router();
const commentRouter = express.Router();

// housing info router /housing
housingRouter
  .post("/", protect, checkHRRole, getHousingDetailsForEmployee)
  .post("/getProfileId", protect, checkHRRole, getProfileIdFromUid)
  .post("/add", protect, checkHRRole, addHouseForHR)
  .post("/getAllBasicHouses", protect, checkHRRole, getAllBasicHouseInfoForHR)
  .post("/getHouseSummary", protect, checkHRRole, getHouseSummaryForHR)
  .post("/addEmployeeToHouse", protect, checkHRRole, addEmpToHouse)
  .delete("/delete", protect, checkHRRole, deleteHouseForHR)
  .post("/assign", protect, checkHRRole, assignHousing);
// facility report router /report
reportRouter
  .post("/", protect, checkHRRole, getReportForEmployee)
  .post("/add", protect, checkHRRole, createReportForEmployee);
// comment info router /comment
commentRouter
  .post("/", protect, checkHRRole, getReportComments)
  .post("/add", protect, checkHRRole, createComment)
  .patch("/update", protect, checkHRRole, updateComment);
export { housingRouter, reportRouter, commentRouter };
