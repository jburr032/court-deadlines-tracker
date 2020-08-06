import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
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
        console.log("NOT FOUND!!");
        throw new NotFoundError();
      }

      // Type coercion to compare String to Number
      if (req.currentUser!.id != user._id) {
        throw new Error("not authorised");
      }

      const passwordComparison = await PasswordHasher.comparePassword(
        user.password,
        password
      );

      if (!passwordComparison) {
        throw new NotAuthorizedError();
      }

      await User.findByIdAndDelete(user.id);

      res.send(200);
    } catch (error) {
      console.error(error);
    } finally {
      res.status(500).send();
    }
  }
);

export { router as deleteUserRouter };
