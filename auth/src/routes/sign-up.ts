import express, { Request, Response } from "express";
import { validateRequest } from "@parkerco/common";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user-model";
import { findUser, doPasswordChecks } from "../services/custom-body-validators";

const router = express.Router();

router.post(
  "/api/v1/sign-up",
  [
    body("username").notEmpty().withMessage("You must provide a username"),
    body("signUpEmail")
      .isEmail()
      .custom((signUpEmail) => findUser(signUpEmail)),
    body("password").custom((password) => doPasswordChecks(password)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, signUpEmail, sendFromEmail, password } = req.body;

    // Save user to db
    const user = User.build({
      username,
      signUpEmail,
      // Use signUpEmail if user does not specify a different address to send orders from
      sendFromEmail: sendFromEmail ? sendFromEmail : signUpEmail,
      password,
    });
    user.save();

    const jwToken = jwt.sign(
      {
        id: user.id,
        email: user.signUpEmail,
      },
      "abjjhjd" //process.env.JWT_KEY!
    );

    req.session = {
      jwt: jwToken,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
