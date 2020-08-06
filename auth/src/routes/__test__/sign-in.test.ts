import request from "supertest";

import { User } from "../../models/user-model";
import { app } from "../../app";

// Helper sign-up function
const signUpHelper = async () => {
  await request(app).post("/api/v1/sign-up").send({
    signUpEmail: "test_1jhkfhkdfj@test.com",
    sendFromEmail: null,
    password: "password",
    username: "username",
  });
};

describe("Tests for the sign-in route", () => {
  it("Checks for 400 for invalid email", async () => {
    await signUpHelper();

    await request(app)
      .post("/api/v1/sign-in")
      .send({
        signUpEmail: "test_1jhkfh.com",
        password: "password",
      })
      .expect(400);
  });

  it("Checks for 400 for invalid password", async () => {
    await signUpHelper();

    await request(app)
      .post("/api/v1/sign-in")
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        password: "pass",
      })
      .expect(400);
  });

  it("Checks for successful sign-in", async () => {
    await signUpHelper();

    const response = await request(app)
      .post("/api/v1/sign-in")
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        password: "password",
      })
      .expect(200);
  });
});
