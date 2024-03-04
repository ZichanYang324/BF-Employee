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
  getProfileIdFromUid,
} from "../controllers/housingControllers.js";
import express from "express";

const housingRouter = express.Router();
const reportRouter = express.Router();
const commentRouter = express.Router();

// TODO: add middlewares to authentify/validate request

// housing info router /housing
housingRouter
<<<<<<< HEAD
  .get("/", getHousingDetailsForEmployee)
=======
  .post("/", getHousingDetailsForEmployee)
  .post("/getProfileId", getProfileIdFromUid)
>>>>>>> 1d15dc99da34dcbb7880517315f6e53d246c5f54
  .post("/add", addHouseForHR)
  .post("/getAllBasicHouses", getAllBasicHouseInfoForHR)
  .post("/getHouseSummary", getHouseSummaryForHR)
  .delete("/delete", deleteHouseForHR);
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
