import * as hrProfilesControllers from "../controllers/hrProfilesControllers.js";
import express from "express";

export const hrProfilesRouter = express.Router();

hrProfilesRouter.get("/summary", hrProfilesControllers.summary);
