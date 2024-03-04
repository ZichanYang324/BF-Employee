import {
  commentRouter,
  housingRouter,
  reportRouter,
} from "./routers/HousingRouter.js";
import { hrProfilesRouter } from "./routers/HrProfilesRouter.js";
import { infoRouter } from "./routers/InfoRouter.js";
import profileRouter from "./routers/ProfileRouter.js";
import documentRoutes from "./routers/documentRoutes.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import process from "process";

const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (_req, res) => {
  res.status(200).send("<h1>Server started</h1>");
});
app.use("/hr/profiles", hrProfilesRouter);
app.use("/info", infoRouter);
app.use("/profile", profileRouter);
app.use("/documents", documentRoutes);
//app.use('/users', userRoutes);
app.use("/housing", housingRouter);
app.use("/report", reportRouter);
app.use("/comment", commentRouter);
app.all("*", (_req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

export default app;
