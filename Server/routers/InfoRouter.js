import * as InfoControllers from "../controllers/infoControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import express from "express";

export const infoRouter = express.Router();

infoRouter.get("/", authenticate, InfoControllers.getProfile);
infoRouter.get("/documents", authenticate, InfoControllers.getDocuments);
infoRouter.post("/update/:section", authenticate, InfoControllers.update);
