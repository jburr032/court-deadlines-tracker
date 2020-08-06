import express, { Request, Response } from "express";
import {
  requireAuth,
  NotAuthorizedError,
  NotFoundError,
} from "@parkerco/common";
import { body } from "express-validator";

import { User } from "../models/user-model";
import PasswordHasher from "../services/password-hasher";

const router = express.Router();

// Users will need to submit their password to confirm deletion
router.delete(
  "/api/v1/:userId/delete-account",
  requireAuth,
  async (req: Request, res: Response) => {
    let user;
    const {
      params: { userId },
      body: { password },
    } = req;

    try {
      user = await User.findById(userId);

      if (!user) {
        return res.status(400).send();
      }

      // Type coercion to compare String to Number
      if (req.currentUser!.id != user!._id) {
        return res.status(401).send();
      }

      const passwordComparison = await PasswordHasher.comparePassword(
        user!.password,
        password
      );

      if (!passwordComparison) {
        return res.status(401).send();
      }

      await User.findByIdAndDelete(user!.id);

      res.status(200).send();
    } catch (error) {
      console.error(error);
    } finally {
      return res.status(500).send();
    }
  }
);

export { router as deleteUserRouter };
