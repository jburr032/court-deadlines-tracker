import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, currentUser } from "@parkerco/common";
import { newCaseRouter } from "./routes/new-case";

const app = express();

app.set("trust proxy", true);

app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

app.use(currentUser);
app.use(json());

app.use(newCaseRouter);

app.use(errorHandler);

export { app };
