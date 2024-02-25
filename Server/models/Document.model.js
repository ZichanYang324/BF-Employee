import mongoose from "mongoose";
<<<<<<< HEAD
import constants from "../config/constants.js";
=======
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  // Existing fields
  URL: { type: String, required: true },
  S3Bucket: { type: String, required: true },
  S3Name: { type: String, required: true },
  // New fields
  type: {
    type: String,
<<<<<<< HEAD
    enum: ["OPT Receipt", "OPT EAD", "I-983", "I-20"],
=======
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
    required: true,
  },
  status: {
    type: String,
<<<<<<< HEAD
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
=======
    required: true,
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
  },
  owner: {
    type: refType,
    ref: "User",
    required: true,
  },
  feedback: {
    type: String,
<<<<<<< HEAD
    default: "",
=======
    required: true,
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540
  },
});

export default mongoose.model("Document", DocumentSchema);
