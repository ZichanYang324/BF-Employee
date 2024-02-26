import {
  createComment,
  getReportComments,
  updateComment,
} from "../controllers/commentControllers.js";
import {
  createReportForEmployee,
  getReportForEmployee,
} from "../controllers/facilityReportControllers.js";
import { getHousingDetailsForEmployee ,addHouseForHR,getAllBasicHouseInfoForHR,getHouseSummaryForHR} from "../controllers/housingControllers.js";
import express from "express";

const housingRouter = express.Router();
const reportRouter = express.Router();
const commentRouter = express.Router();

// TODO: add middlewares to authentify/validate request

// housing info router /housing
housingRouter.get("/", getHousingDetailsForEmployee).post('/add',addHouseForHR).get('/getAllBasicHouses',getAllBasicHouseInfoForHR).get('/getHouseSummary',getHouseSummaryForHR);
// facility report router /report
reportRouter
  .get("/", getReportForEmployee)
  .post("/add", createReportForEmployee);
// comment info router /comment
commentRouter
  .get("/", getReportComments)
  .post("/add", createComment)
  .patch("/update", updateComment);
export { housingRouter, reportRouter, commentRouter };
