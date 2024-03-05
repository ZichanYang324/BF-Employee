import * as hrProfilesControllers from "../controllers/hrProfilesControllers.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import checkHRRole from "../middlewares/hrRoleMiddleware.js";

export const hrProfilesRouter = express.Router();

// TODO: Add middleware to check if user is HR
hrProfilesRouter.get(
  "/summary",
  authMiddleware.protect,
  checkHRRole,
  hrProfilesControllers.summary,
);
hrProfilesRouter.get(
  "/entire",
  authMiddleware.protect,
  checkHRRole,
  hrProfilesControllers.entireProfile,
);
