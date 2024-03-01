import express from "express";
import { sendLink } from "../controllers/hiringManagementControllers.js";

const hiringManagementRouter = express.Router();

hiringManagementRouter.route("/sendLink").post(sendLink);

export default hiringManagementRouter;

