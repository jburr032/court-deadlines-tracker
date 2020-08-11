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
    const {
      params: { userId },
      body: { password },
    } = req;

    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new NotFoundError();
      }

      // Type coercion to compare String to Number
      if (req.currentUser!.id != user!._id) {
        throw new NotAuthorizedError();
      }

      const passwordComparison = await PasswordHasher.comparePassword(
        user!.password,
        password
      );

      if (!passwordComparison) {
        throw new NotAuthorizedError();
      }

      await User.findByIdAndDelete(user!.id);

      res.status(200).send();
    } catch (error) {
      res.status(error.statusCode).send(error.message);
    }
  }
);

export { router as deleteUserRouter };
