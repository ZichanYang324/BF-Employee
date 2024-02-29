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
  addHouseForHR,
  deleteHouseForHR,
  getAllBasicHouseInfoForHR,
  getHouseSummaryForHR,
  getHousingDetailsForEmployee,
} from "../controllers/housingControllers.js";
import express from "express";

const housingRouter = express.Router();
const reportRouter = express.Router();
const commentRouter = express.Router();

// TODO: add middlewares to authentify/validate request

// housing info router /housing
housingRouter
  .post("/", getHousingDetailsForEmployee)
  .post("/add", addHouseForHR)
  .get("/getAllBasicHouses", getAllBasicHouseInfoForHR)
  .get("/getHouseSummary", getHouseSummaryForHR)
  .delete("/delete", deleteHouseForHR);
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
