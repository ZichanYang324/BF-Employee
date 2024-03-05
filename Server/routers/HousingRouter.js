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
import { protect } from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";
import express from "express";

const housingRouter = express.Router();
const reportRouter = express.Router();
const commentRouter = express.Router();

// housing info router /housing
housingRouter
  .post("/", getHousingDetailsForEmployee)
  .post("/getProfileId", getProfileIdFromUid)
  .post("/add", addHouseForHR)
  .post("/getAllBasicHouses", getAllBasicHouseInfoForHR)
  .post("/getHouseSummary", getHouseSummaryForHR)
  .post("/addEmployeeToHouse", addEmpToHouse)
  .delete("/delete", deleteHouseForHR)
  .post("/assign", assignHousing);
// facility report router /report
reportRouter
  .post("/", getReportForEmployee)
  .post("/add", createReportForEmployee);
// comment info router /comment
commentRouter
  .post("/", getReportComments)
  .post("/add", createComment)
  .patch("/update", updateComment);
export { housingRouter, reportRouter, commentRouter };
