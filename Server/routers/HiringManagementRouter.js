import { sendLink } from "../controllers/hiringManagementControllers.js";
import { getHistory } from "../controllers/hiringManagementControllers.js";
import express from "express";

const hiringManagementRouter = express.Router();

hiringManagementRouter.route("/sendLink").post(sendLink);
hiringManagementRouter.route("/getHistory").get(getHistory);

export default hiringManagementRouter;
