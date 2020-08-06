import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "@parkerco/common";

import { currentUser } from "./middleware/current-user";
import { signupRouter } from "./routes/sign-up";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { updateUserRouter } from "./routes/update-user";
import { deleteUserRouter } from "./routes/delete-user";

const app = express();

app.use(json());

// Express to trust the nginx proxy
// Could set the IP address of the proxy for better security
app.set("trust proxy", true);

app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

app.use(currentUser);

app.use(signupRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);

// Custom middleware to handle errors thrown by body-parser
app.use(errorHandler);
export { app };
