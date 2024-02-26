import DevRouter from "./routers/DevRouter.js";
import userRouter from "./routers/userRouter.js";
import {
  commentRouter,
  housingRouter,
  reportRouter,
} from "./routers/HousingRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import process from "process";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (_req, res) => {
  res.status(200).send("<h1>Server started</h1>");
});

app.use("/dev", DevRouter);

// housing, report, comment api router

app.use("/housing", housingRouter);
app.use("/report", reportRouter);
app.use("/comment", commentRouter);

app.all("*", (_req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

export default app;
