import argon2 from "argon2";
import mongoose from "mongoose";
import { User, Profile } from "../models/index.js";

const MONGO_URL = process.env.MONGO_URL;

const seed = async () => {
  try {
    mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Profile.deleteMany({});

    const user = {
      username: "user1",
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
