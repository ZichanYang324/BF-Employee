import asyncHandler from "../middlewares/asyncHandler.js";
import RegistrationModel from "../models/Registration.model.js";
import ProfileModel from "../models/Profile.model.js";
import { sendEmail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";

export const sendLink = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "3h",
  });
  const registrationLink = `http://localhost:5173/register?token=${token}`;

  const emailBody = `
    <h1>Welcome</h1>
    <p>Dear ${name}</p>
    <p>Please use <a href="${registrationLink}">this link</a> to complete registration.</p>
  `;

  await sendEmail(email, "Registration Link", emailBody);

  await RegistrationModel.create({ email, name, link: registrationLink });

  res.status(200).json({ message: "Email sent successfully!" });
});

export const getHistory = asyncHandler(async (_req, res) => {
  const history = await RegistrationModel.find({});
  res.status(200).json(history);
});

export const getApplicationByStatus = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const applications = await ProfileModel.find({ applicationStatus: status});
  res.status(200).json(applications);
});
