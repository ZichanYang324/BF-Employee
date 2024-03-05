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
  .post("/", protect, getHousingDetailsForEmployee)
  .post("/getProfileId", protect,  getProfileIdFromUid)
  .post("/add", protect, addHouseForHR)
  .post("/getAllBasicHouses", protect, getAllBasicHouseInfoForHR)
  .post("/getHouseSummary", protect, getHouseSummaryForHR)
  .post("/addEmployeeToHouse", protect, checkHRRole, addEmpToHouse)
  .delete("/delete", protect, checkHRRole, deleteHouseForHR)
  .post("/assign", protect, checkHRRole, assignHousing);
// facility report router /report
reportRouter
  .post("/", protect, getReportForEmployee)
  .post("/add", protect, createReportForEmployee);
// comment info router /comment
commentRouter
  .post("/", protect, checkHRRole, getReportComments)
  .post("/add", protect, checkHRRole, createComment)
  .patch("/update", protect, checkHRRole, updateComment);
export { housingRouter, reportRouter, commentRouter };
