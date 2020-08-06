/**
 * Local implementation of the same currentUser middle in @package parkerco/common
 * for local testing when uploading to Github with Github Activities and
 * using a random JWT_KEY until @var process.env.JWT_KEY is implemented
 */

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Equivalent to (!req.session || !req.session.jwt)
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      "abjjhjd" //process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
