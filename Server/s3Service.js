// s3Service.js
import { bucketName } from "./config/s3";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function uploadFileToS3(fileBuffer, fileName) {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: "application/pdf",
  };

  try {
    const response = await s3.upload(params).promise();
    return { url: response.Location, bucket: bucketName, key: fileName };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Error uploading file to S3");
  }
}

export default { uploadFileToS3 };
