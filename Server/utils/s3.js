import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3, bucketName } from "../config/s3.js";

/**
 * List files in the bgp-zichan S3 bucket.
 * @param {Partial<import("@aws-sdk/client-s3").ListObjectsV2CommandInput>} params - The parameters to send to the Amazon S3 API.
 */
export async function listFiles(params = {}) {
  const _params = {
    Bucket: bucketName,
    ...params,
  };
  try {
    const data = await s3.send(new ListObjectsV2Command(_params));
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Upload a file to the bgp-zichan S3 bucket.
 * @param {Partial<import("@aws-sdk/client-s3").PutObjectCommandInput>} params - The parameters to send to the Amazon S3 API.
 */
export async function uploadOneFile(params = {}) {
  const _params = {
    Bucket: bucketName,
    ...params,
  };
  try {
    const data = await s3.send(new PutObjectCommand(_params));
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Delete a file from the bgp-zichan S3 bucket.
 * @param {Partial<import("@aws-sdk/client-s3").DeleteObjectCommandInput>} params - The parameters to send to the Amazon S3 API.
 */
export async function deleteOneFile(params = {}) {
  const _params = {
    Bucket: bucketName,
    ...params,
  };
  try {
    const data = await s3.send(new DeleteObjectCommand(_params));
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get a file from the bgp-zichan S3 bucket.
 * @param {Partial<import("@aws-sdk/client-s3").GetObjectCommandInput>} params - The parameters to send to the Amazon S3 API.
 */
export async function getOneFile(params = {}) {
  const _params = {
    Bucket: bucketName,
    ...params,
  };
  try {
    const data = await s3.send(new GetObjectCommand(_params));
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
