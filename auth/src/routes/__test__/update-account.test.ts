import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

describe("Tests for the update route", () => {
  it("Checks the update was unsuccessful due to unauthorization", async () => {
    const [cookie, userId] = await global.signIn();

    return request(app)
      .patch(`/api/v1/${userId}/update-account`)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username_22",
      })
      .expect(401);
  });

  it("Checks that a 404 is return ", async () => {
    const [cookie, user] = await global.signIn();
    const userId = mongoose.Types.ObjectId().toHexString();

    const response = await request(app)
      .patch(`/api/v1/${userId}/update-account`)
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username_22",
      })
      .expect(404);
  });

  it("Checks a username update was successful", async () => {
    const [cookie, userId] = await global.signIn();

    const response = await request(app)
      .patch(`/api/v1/${userId}/update-account`)
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username_22",
      })
      .expect(200);

    expect(response.body.username).toEqual("username_22");
  });

  it("Checks a signUpEmail update was successful", async () => {
    const [cookie, userId] = await global.signIn();

    const response = await request(app)
      .patch(`/api/v1/${userId}/update-account`)
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1j@test.com",
        sendFromEmail: null,
        password: "password",
        username: "username",
      })
      .expect(200);

    expect(response.body.signUpEmail).toEqual("test_1j@test.com");
  });

  it("Checks a password update was successful", async () => {
    const [cookie, userId] = await global.signIn();

    return request(app)
      .patch(`/api/v1/${userId}/update-account`)
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
    const [cookie, userId] = await global.signIn();

    const response = await request(app)
      .patch(`/api/v1/${userId}/update-account`)
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_1jhkfhkdfj@test.com",
        sendFromEmail: "_test_test@test.com",
        password: "password",
        username: "username",
      })
      .expect(200);

    expect(response.body.sendFromEmail).toEqual("_test_test@test.com");
  });

  it("Checks all credentials were successfully updated", async () => {
    const [cookie, userId] = await global.signIn();

    const response = await request(app)
      .patch(`/api/v1/${userId}/update-account`)
      .set("Cookie", cookie)
      .send({
        signUpEmail: "test_j@test.com",
        sendFromEmail: "_test_test_test@test.com",
        password: "password_1",
        username: "username_22",
      })

      .expect(200);

    expect(response.body.id).toEqual(userId);
    expect(response.body.username).toEqual("username_22");
  });
});
