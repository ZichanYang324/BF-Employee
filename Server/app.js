import cors from "cors";
import express from "express";
import registerRouter from "./routers/registerRouter.js";
import morgan from "morgan";
import path from "path";
import process from "process";
import cookieParser from "cookie-parser";
import DevRouter from "./routers/DevRouter.js";
import {
  housingRouter,
  commentRouter,
  reportRouter,
} from "./routers/HousingRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use('/user', registerRouter);
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
