import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import process from "process";

dotenv.config();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFileToS3 = async (file, prefix = "dongming/") => {
  const fileKey = `${prefix}${Date.now()}_${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const s3Response = await s3Client.send(command);
    return {
      ...s3Response,
      Location: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
