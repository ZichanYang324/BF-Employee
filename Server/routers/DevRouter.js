// For development purposes only, remove in production

import { Router } from "express";
import { getOneFile } from "../utils/s3.js";

const router = Router();

router.get("read", async (_req, res) => {
  const file = await getOneFile({ Key: "hello.txt" });
  if (file.error) {
    return res.status(500).send("<h1>Internal server error</h1>");
  }
  res.status(200).send(file.data?.Body?.toString());
});

export default router;
