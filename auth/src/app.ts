import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "@parkerco/common";

import { signupRouter } from "./routes/sign-up";

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

app.use(signupRouter);

// Custom middleware to handle errors thrown by body-parser
app.use(errorHandler);
export { app };
