import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
