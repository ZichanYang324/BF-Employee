import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  URL: {
    type: String,
  },
  S3Bucket: {
    type: String,
    required: true,
    default: "bgp-zichan",
  },
  S3Key: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Document", DocumentSchema);
