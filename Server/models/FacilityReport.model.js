import mongoose from "mongoose";
import constants from "../config/constants";

const Schema = mongoose.Schema;

const facilityReportSchema = new Schema({
  houseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Housing",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: constants.facilityReportStatus,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("FacilityReport", facilityReportSchema);
