import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@parkerco/common";
import jwt from "jsonwebtoken";

import { User } from "../models/user-model";
import PasswordHasher from "../services/password-hasher";

const router = express.Router();

router.post(
  "/api/v1/sign-in",
  [body("signUpEmail").isEmail().notEmpty(), body("password").notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { signUpEmail, password } = req.body;

    try {
      const user = await User.findOne({ signUpEmail });

      if (!user) {
        return res.status(404).send();
      }

      // Override TS as we perform a user search in the custom express-validator middleware
      const confirmPassword = await PasswordHasher.comparePassword(
        user!.password,
        password
      );

      if (!confirmPassword) {
        return res.status(401).send();
      }

      const jwToken = jwt.sign(
        {
          id: signUpEmail,
          password: password,
        },
        "abjjhjd" //process.env.JWT_KEY!
      );

      req.session = { jwt: jwToken };

      res.status(200).send(user);
    } catch (error) {
      console.error(error);
    } finally {
      res.status(500).send();
    }
  }
);

export { router as signInRouter };
