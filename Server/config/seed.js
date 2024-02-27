import { Profile, User } from "../models/index.js";
import argon2 from "argon2";
import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";

dotenv.config();

const seed = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Profile.deleteMany({});

    const user = {
      username: "user",
      email: "user1@mail.com",
      password: await argon2.hash("pswd1"),
    };

    await User.create(user);
    console.log("Succeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
