import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import process from "process";
import cookieParser from "cookie-parser";
import documentRoutes from './routers/documentRoutes.js';
//import userRoutes from './routers/userRoutes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (_req, res) => {
  res.status(200).send("<h1>Server started</h1>");
});
app.use('/documents', documentRoutes);
//app.use('/users', userRoutes);
app.all("*", (_req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

export default app;
