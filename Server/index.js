import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";

dotenv.config();
console.log("MONGO_URL:", process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3100, () => {
      console.log("Server listening on port 3100", "http://localhost:3100");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
