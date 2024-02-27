import * as profileControllers from "../controllers/profileControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import express from "express";

export const profileRouter = express.Router();

profileRouter.get("/", authenticate, profileControllers.getProfile);
profileRouter.get("/documents", authenticate, profileControllers.getDocuments);
