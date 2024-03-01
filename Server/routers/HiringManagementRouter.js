import express from "express";
import { generateLink } from "../controllers/hiringManagementControllers";

const hiringManagementRouter = express.Router();

hiringManagementRouter.route("/generateLink").post(generateLink);

