import express from "express";
import { getHousingDetailsForEmployee } from "../controllers/housingControllers.js";
import {
  getReportForEmployee,
  createReportForEmployee,
} from "../controllers/facilityReportControllers.js";
import {
  getReportComments,
  updateComment,
  createComment,
} from "../controllers/commentControllers.js";

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
