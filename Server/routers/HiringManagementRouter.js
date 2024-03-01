import express from "express";
import { sendLink } from "../controllers/hiringManagementControllers.js";
import { getHistory } from "../controllers/hiringManagementControllers.js";

const hiringManagementRouter = express.Router();

hiringManagementRouter.route("/sendLink").post(sendLink);
hiringManagementRouter.route("/getHistory").get(getHistory);

export default hiringManagementRouter;

