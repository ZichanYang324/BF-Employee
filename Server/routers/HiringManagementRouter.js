import { sendLink } from "../controllers/hiringManagementControllers.js";
import { getHistory } from "../controllers/hiringManagementControllers.js";
import { getApplicationByStatus } from "../controllers/hiringManagementControllers.js";
import { getApplicationById } from "../controllers/hiringManagementControllers.js";
import { updateApplicationStatus } from "../controllers/hiringManagementControllers.js";
import { addFeedback } from "../controllers/hiringManagementControllers.js";
import express from "express";

const hiringManagementRouter = express.Router();

hiringManagementRouter.route("/sendLink").post(sendLink);
hiringManagementRouter.route("/getHistory").get(getHistory);
hiringManagementRouter
  .route("/getApplicationByStatus")
  .get(getApplicationByStatus);
hiringManagementRouter.route("/getApplicationById").get(getApplicationById);
hiringManagementRouter
  .route("/updateApplicationStatus")
  .put(updateApplicationStatus);
hiringManagementRouter.route("/addFeedback").put(addFeedback);

export default hiringManagementRouter;