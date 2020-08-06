import request from "supertest";

import { User } from "../../models/user-model";
import { app } from "../../app";

describe("Tests for the update route", () => {
  it("Checks the update was unsuccessful with invalid fields", async () => {
    const cookie = await global.signIn();

    // Expect 400 BadRequestError
    // when attempting to remove signUpEmail via update
    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send({
        signUpEmail: "",
        sendFromEmail: null,
        password: "password",
        username: "username",
      })
      .expect(400);
  });

  it("Checks the update was unsuccessful do to unauthorization", async () => {
    await global.signIn();

    // Expect 401 UnauthorizedError
    // when using different cookie
    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", await global.signIn())
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username_22",
      })
      .expect(401);
  });

  it("Checks a username update was successful", async () => {
    const cookie = await global.signIn();

    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username_22",
      })
      .expect(200);
  });

  it("Checks a signUpEmail update was successful", async () => {
    const cookie = await global.signIn();

    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1j@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username",
      })
      .expect(200);
  });

  it("Checks a password update was successful", async () => {
    const cookie = await global.signIn();

    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password_1",
        username: "username",
      })
      .expect(200);
  });

  it("Checks a sendFromEmail update was successful", async () => {
    const cookie = await global.signIn();

    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: "_test_test@test.com",
        password: "password",
        username: "username",
      })
      .expect(200);
  });

  it("Checks all credentials were successfully updated", async () => {
    const cookie = await global.signIn();

    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_j@test.com",
        sendFromEmail: "_test_test_test@test.com",
        password: "password_1",
        username: "username_22",
      })
      .expect(200);
  });
});
