import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { User } from "../../models/user-model";

describe("Tests for the delete route", () => {
  it("Checks the delete was unsuccessful due to unauthorized access", async () => {
    const [cookie, userId] = await global.signIn();

    // Attempting to delete the account with a different cookie
    return request(app)
      .delete(`/api/v1/${userId}/delete-account`)
      .send({ password: "password" })
      .expect(401);
  });

  it("Checks 401 for incorrect password", async () => {
    const [cookie, userId] = await global.signIn();

    await request(app)
      .delete(`/api/v1/${userId}/delete-account`)
      .set("Cookie", cookie)
      .send({ password: "passwrod" })
      .expect(401);
  });

  it("Checks 404 for unfound user with invalid userId", async () => {
    let [cookie, userId] = await global.signIn();
    userId = mongoose.Types.ObjectId().toHexString();

    await request(app)
      .delete(`/api/v1/${userId}/delete-account`)
      .set("Cookie", cookie)
      .send({ password: "password" })
      .expect(404);
  });

  it("Checks the account is removed from mongoDB", async () => {
    const [cookie, userId] = await global.signIn();

    await request(app)
      .delete(`/api/v1/${userId}/delete-account`)
      .set("Cookie", cookie)
      .send({ password: "password" })
      .expect(200);

    const deletedUser = await User.findById(userId);
    expect(deletedUser).toEqual(null);
  });
});
