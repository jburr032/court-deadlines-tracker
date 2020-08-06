import request from "supertest";

import { app } from "../../app";

describe("Tests for the delete route", () => {
  it("Checks the delete was unsuccessful due to unauthorized access", async () => {
    const cookie = await global.signIn();

    // Attempting to delete the account with a different cookie
    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", await global.signIn())
      .send()
      .expect(401);
  });

  it("Checks the account is removed from mongoDB", async () => {
    const cookie = await global.signIn();

    return request(app)
      .delete("/api/v1/remove-user")
      .set("Cookie", cookie)
      .send()
      .expect(200);
  });
});
