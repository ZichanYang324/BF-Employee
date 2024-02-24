import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FacilityReport",
    required: true,
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", commentSchema);
