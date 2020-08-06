import request from "supertest";

import { app } from "../../app";
import { User } from "../../models/user-model";

describe("Sign up tests", () => {
  it("Checks for 400 for invalid email and password", async () => {
    return request(app)
      .post("/api/v1/sign-up")
      .send({
        signUpEmail: "test_1jhkfhkdf",
        sendFromEmail: "",
        password: "p",
        username: "username",
      })
      .expect(400);
  });

  it("Checks for 400 is thrown if user already exists", async () => {
    await request(app)
      .post("/api/v1/sign-up")
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: "attempt1@test.com",
        password: "password",
        username: "username",
      })
      .expect(201);

    return request(app)
      .post("/api/v1/sign-up")
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: "attempt1@test.com",
        password: "password",
        username: "username",
      })
      .expect(400);
  });

  it("Checks for a successful sign-up", async () => {
    const newUser = await request(app)
      .post("/api/v1/sign-up")
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username",
      })
      .expect(201);

    const user = await User.findOne({
      signUpEmail: "test_1jhkfhkdfj@test.com",
    });

    expect(newUser.body.signUpEmail).toEqual(user!.signUpEmail);
    expect(newUser.body.sendFromEmail).toEqual(user!.signUpEmail);
  });
});
