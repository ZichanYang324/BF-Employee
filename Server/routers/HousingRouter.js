import {
  createComment,
  getReportComments,
  updateComment,
} from "../controllers/commentControllers.js";
import {
  createReportForEmployee,
  getReportForEmployee,
} from "../controllers/facilityReportControllers.js";
import { getHousingDetailsForEmployee } from "../controllers/housingControllers.js";
import express from "express";

const housingRouter = express.Router();
const reportRouter = express.Router();
const commentRouter = express.Router();

// TODO: add middlewares to authentify/validate request

// housing info router
housingRouter.get("/", getHousingDetailsForEmployee);
// facility report router
reportRouter
  .get("/", getReportForEmployee)
  .post("/add", createReportForEmployee);
// comment info router
commentRouter
  .get("/", getReportComments)
  .post("/add", createComment)
  .patch("/update", updateComment);
export { housingRouter, reportRouter, commentRouter };
