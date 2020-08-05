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

describe("Tests for sign-out route", () => {
  it("Checks the cookie has been removed and a successful sign-out with a 200 code", async () => {
    await signUpHelper();

    const response = await request(app)
      .post("/api/v1/users/signout")
      .send({})
      .expect(200);

    expect(response.get("Set-Cookie")[0]).toEqual(
      "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
