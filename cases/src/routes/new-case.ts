/**
 * Allows a user to manually create a case timeline
 * by inputting the dates and narrative
 */

import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@parkerco/common";
import { body } from "express-validator";

import { CaseEntry } from "../models/case-model";

const router = express.Router();

router.post(
  "api/v1/cases/new",
  requireAuth,
  [
    body("caseNo").isEmpty().withMessage("Please provide a case number"),
    body("parties").isEmpty().withMessage("Please provide the party names"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { caseNo, parties, caseDeadlines } = req.body;
    try {
      const caseEntry = CaseEntry.build({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: req.currentUser!.id,
        caseNo: caseNo,
        parties: parties,
        caseDeadlines: caseDeadlines,
        owner: req.currentUser!.id,
      });

      await caseEntry.save();

      res.status(201).send(caseEntry);
    } catch (error) {
      console.error(error);
    } finally {
      res.status(500).send();
    }
  }
);

export { router as newCaseRouter };
