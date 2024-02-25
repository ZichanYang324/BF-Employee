import { Profile, User } from "../models/index.js";
import argon2 from "argon2";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const seed = async () => {
  try {
    mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // delete if exists
    if (mongoose.connection.collections.users) {
      await User.deleteMany({});
    }
    if (mongoose.connection.collections.profiles) {
      await Profile.deleteMany({});
    }

    const user = {
      username: "user1",
      email: "user1@mail.com",
      password: await argon2.hash("pswd1"),
    };

    await User.create(user);

    console.log("Succeeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
