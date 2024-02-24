// For development purposes only, remove in production

import { Router } from "express";
import { getOneFile } from "../utils/s3.js";

const router = Router();

const streamToString = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
};

router.get("/read", async (_req, res) => {
  const { data: file, error } = await getOneFile({ Key: "hello.txt" });
  if (error) {
    return res.status(500).send("<h1>Internal server error</h1>");
  }
  const fileContent = await streamToString(file.Body);
  return res.status(200).send(fileContent);
});

export default router;
