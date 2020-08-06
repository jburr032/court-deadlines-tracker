import express, { Request, Response } from "express";
import { requireAuth } from "@parkerco/common";

const router = express.Router();

router.post("/api/v1/sign-out", async (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({ msg: "Successfully signed out" });
});

export { router as signOutRouter };
