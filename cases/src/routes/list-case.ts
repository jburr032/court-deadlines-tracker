import express, { Request, Response } from "express";
import body from "express-validator";
import { validateRequest, requireAuth } from "@parkerco/common";

import { CaseEntry } from "../models/case-model";

const router = express.Router();

router.get(
  "/api/v1/cases",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const caseEntries = await CaseEntry.find({
        owner: req.currentUser!.id,
      });

      if (!caseEntries) {
        res.status(404).send();
      }

      res.status(200).send(caseEntries);
    } catch (error) {
      console.error(error);
    } finally {
      res.status(500).send();
    }
  }
);
