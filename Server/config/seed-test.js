import argon2 from "argon2";
import mongoose from "mongoose";
import { User, Profile, Housing, FacilityReport } from "../models/index.js";

const MONGO_URL = process.env.MONGO_URL;

const seed = async () => {
  try {
    mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Profile.deleteMany({});
    await Housing.deleteMany({});
    await FacilityReport.deleteMany({});

    const users = [
      {
        username: "user1",
        email: "user1@mail.com",
        password: await argon2.hash("pswd1"),
      },
      {
        username: "user2",
        email: "user2@mail.com",
        password: await argon2.hash("pswd1"),
      },
      {
        username: "user3",
        email: "user3@mail.com",
        password: await argon2.hash("pswd1"),
      },
    ];

    await User.create(users);
    console.log("Users created Succeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
