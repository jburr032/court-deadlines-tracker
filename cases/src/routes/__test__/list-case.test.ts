import request from "supertest";

import { app } from "../../app";

describe("Test for route to retrieve list of cases", () => {
  it("Checks for 200 and returned case list", async () => {
    const [cookie, userId] = await global.signIn();

    await request(app)
      .get("/api/v1/users")
      .set("Cookie", cookie)
      .send()
      .expect(200);
  });

  it("Checks for 200 and returned case list of length 0", () => {});

  it("Checks for 401 not authorized", () => {});
});
