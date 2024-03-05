import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import process from "process";

dotenv.config();
const region = "us-east-2";
const bucketName = "bgp-zichan";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
console.log(accessKeyId, secretAccessKey);
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export { s3, bucketName };
