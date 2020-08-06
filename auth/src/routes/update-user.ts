import express, { Request, Response } from "express";
import { body, param } from "express-validator";

import { User } from "../models/user-model";
import {
  requireAuth,
  NotFoundError,
  validateRequest,
  NotAuthorizedError,
} from "@parkerco/common";

const router = express.Router();

router.patch(
  "/api/v1/:userId/update-account",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        throw new NotFoundError();
      }

      // Type coercion to compare String to Number
      if (req.currentUser!.id != user._id) {
        throw new NotAuthorizedError();
      }

      const { username, signUpEmail, sendFromEmail, password } = req.body;

      user.set({
        username: username ? username : user.username,
        signUpEmail: signUpEmail ? signUpEmail : user.signUpEmail,
        sendFromEmail: sendFromEmail ? sendFromEmail : user.sendFromEmail,
        password: password ? password : user.password,
      });

      await user.save();

      res.status(200).send(user);
    } catch (error) {
      console.error(error);
    } finally {
      res.status(500).send();
    }
  }
);

export { router as updateUserRouter };
