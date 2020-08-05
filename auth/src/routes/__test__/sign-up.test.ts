import request from "supertest";

import { app } from "../../app";

describe("Sign up tests", () => {
  it("Checks for 400 for invalid email and password", () => {});

  it("Checks for 400 is thrown if user already exists", () => {});

  it("Checks for a successful sign-up", () => {
    return request(app)
      .post("/api/v1/sign-up")
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: "attempt1@test.com",
        password: "password",
        username: "username",
      })
      .expect(201);
  });
});
