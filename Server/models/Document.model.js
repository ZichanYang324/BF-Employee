import mongoose from "mongoose";
import constants from "../config/constants.js";

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  // Existing fields
  URL: { type: String, required: true },
  S3Bucket: { type: String, required: true },
  S3Name: { type: String, required: true },
  // New fields
  type: {
    type: String,
    enum: ["OPT Receipt", "OPT EAD", "I-983", "I-20"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  owner: {
    type: refType,
    ref: "User",
    required: true,
  },
  feedback: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Document", DocumentSchema);
