/**
 * Set of helper functions to reduce code repetition in router arg signatures.
 * findUser: Checks mongoDB for any pre-existing users and checks that an email is provided
 * doPasswordChecks: if statement to check lenght and truthiness of password
 * body-parser custom methods expect a boolean or error return value
 */

import { BadRequestError } from "@parkerco/common";

import { User } from "../models/user-model";

export const findUser = async (
  signUpEmail: string
): Promise<Error | Boolean> => {
  let foundUser;

  if (!signUpEmail) {
    throw new BadRequestError("Please provide an email");
  }

  try {
    foundUser = await User.findOne({ signUpEmail });
  } catch (err) {
    throw err;
  }

  if (foundUser) {
    throw new BadRequestError("User already exists");
  }

  return true;
};

export const doPasswordChecks = (password: string): Error | Boolean => {
  if (5 > password.length || password.length > 20 || !password) {
    throw new Error("Please provide a password between 5-20 characters");
  }

  return true;
};
