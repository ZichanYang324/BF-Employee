import * as profileControllers from "../controllers/profileControllers.js";
import express from "express";

export const profileRouter = express.Router();

profileRouter.get("/", profileControllers.getProfile);
