import { sendLink } from "../controllers/hiringManagementControllers.js";
import { getHistory } from "../controllers/hiringManagementControllers.js";
import { getApplicationByStatus } from "../controllers/hiringManagementControllers.js";
import { getApplicationById } from "../controllers/hiringManagementControllers.js";
import { updateApplicationStatus } from "../controllers/hiringManagementControllers.js";
import { addFeedback } from "../controllers/hiringManagementControllers.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";

const hiringManagementRouter = express.Router();

hiringManagementRouter.route("/sendLink").post(protect, checkHRRole, sendLink);
hiringManagementRouter.route("/getHistory").get(protect, checkHRRole, getHistory);
hiringManagementRouter
  .route("/getApplicationByStatus")
  .get(protect, checkHRRole, getApplicationByStatus);
hiringManagementRouter.route("/getApplicationById").get(protect, checkHRRole, getApplicationById);
hiringManagementRouter
  .route("/updateApplicationStatus")
  .put(protect, checkHRRole, updateApplicationStatus);
hiringManagementRouter.route("/addFeedback").put(protect, checkHRRole, addFeedback);

export default hiringManagementRouter;
