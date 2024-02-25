<<<<<<< HEAD
import express from "express";
import cors from "cors";
=======
import DevRouter from "./routers/DevRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import registerRouter from "./routers/registerRouter.js";
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
import morgan from "morgan";
import path from "path";
import process from "process";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
import documentRoutes from './routers/documentRoutes.js';
//import userRoutes from './routers/userRoutes.js';
=======
import DevRouter from "./routers/DevRouter.js";
import {
  housingRouter,
  commentRouter,
  reportRouter,
} from "./routers/HousingRouter.js";
import router from "./routers/DevRouter.js";

>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
<<<<<<< HEAD
=======
app.use('/user', registerRouter);
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (_req, res) => {
  res.status(200).send("<h1>Server started</h1>");
<<<<<<< HEAD
});
app.use('/documents', documentRoutes);
//app.use('/users', userRoutes);
app.all("*", (_req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

=======
});

app.use("/dev", DevRouter);

// housing, report, comment api router

app.use("/housing", housingRouter);
app.use("/report", reportRouter);
app.use("/comment", commentRouter);

app.all("*", (_req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
export default app;
