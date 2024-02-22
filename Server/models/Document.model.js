import mongoose from "mongoose";
import constants from "../config/constants";

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  URL: {
    type: String,
    required: true,
  },
  S3Bucket: {
    type: String,
    required: true,
  },
  S3Name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Document", DocumentSchema);
