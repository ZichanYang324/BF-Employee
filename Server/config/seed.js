import { Document, Profile, User } from "../models/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";

dotenv.config();

function seedProfile() {
  const driversLicenseDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Key: "drivers-license-1234567890",
  });
  const optReceiptDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Key: "opt-receipt-1234567890",
  });
  const optEADDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Key: "opt-ead-1234567890",
  });
  const i983Doc = new Document({
    S3Bucket: "bgp-zichan",
    S3Key: "i983-1234567890",
  });
  const i20Doc = new Document({
    S3Bucket: "bgp-zichan",
    S3Key: "i20-1234567890",
  });

  const profile = new Profile({
    firstName: "Alice",
    lastName: "Cooper",
    middleName: "B",
    preferredName: "Alice",
    gender: "FEMALE",
    profilePic: null,
    cellPhone: "123-456-7890",
    workPhone: "123-456-7890",
    address: {
      street: "123 Main St",
      building: "Apt 101",
      city: "Anytown",
      state: "NY",
      zip: "12345",
    },
    car: {
      make: "Toyota",
      model: "Camry",
      color: "Black",
    },
    SSN: "123-45-6789",
    DOB: new Date("1990-01-01"),
    immigrationStatus: "VISA",
    workAuth: {
      title: "OPT",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2023-01-01"),
    },
    driversLicense: {
      number: "1234567890",
      state: "NY",
      expiration: new Date("2025-01-01"),
      document: driversLicenseDoc._id,
    },
    reference: {
      firstName: "Bob",
      lastName: "Smith",
      relationship: "Friend",
      phone: "113-456-7890",
      email: "bobsmith@bgptest.com",
    },
    emergencyContacts: [
      {
        firstName: "Charlie",
        lastName: "Brown",
        relationship: "Friend",
        phone: "123-456-7890",
        email: "charlieb@bgptest.com",
      },
      {
        firstName: "David",
        lastName: "Johnson",
        relationship: "Friend",
        phone: "123-456-7890",
        email: "davidJohnson@bgptest.com",
      },
    ],
    OPTReceipt: {
      document: optReceiptDoc._id,
      status: "APPROVED",
    },
    OPTEAD: {
      document: optEADDoc._id,
      status: "REJECTED",
      feedback: "Incorrect date of birth",
    },
    I983: {
      document: i983Doc._id,
      status: "PENDING",
    },
    I20: {
      document: i20Doc._id,
      status: "APPROVED",
    },
    applicationStatus: "APPROVED",
  });

  return {
    driversLicenseDoc,
    optReceiptDoc,
    optEADDoc,
    i983Doc,
    i20Doc,
    profile,
  };
}

const seed = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Profile.deleteMany({});

    const _profiles = seedProfile();
    const { profile } = _profiles;
    await Promise.all(Object.values(_profiles).map((doc) => doc.save()));

    const userContent = {
      username: "user1",
      email: "user1@mail.com",
      password: await bcrypt.hash("pswd1"),
      profile: profile._id,
    };

    await User.create(userContent);

    console.log("Succeeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
