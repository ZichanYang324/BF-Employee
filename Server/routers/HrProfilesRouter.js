import * as hrProfilesControllers from "../controllers/hrProfilesControllers.js";
import express from "express";

export const hrProfilesRouter = express.Router();

// TODO: Add middleware to check if user is HR
hrProfilesRouter.get("/summary", hrProfilesControllers.summary);
hrProfilesRouter.get("/entire", hrProfilesControllers.entireProfile);
