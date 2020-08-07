import request from "supertest";

import { app } from "../../app";

describe("Test for new case router", () => {
  it("Checks for 201 response", async () => {
    const [cookie, userId] = await global.signIn();

    return request(app)
      .post("api/v1/cases/new")
      .set("Cookie", cookie)
      .send({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
        caseNo: "HT-2019-XXXX",
        parties: ["DWF"],
        caseDeadlines: [{}],
        owner: userId,
      })
      .expect(201);
  });
  it("Checks 400 for missing caseNo", async () => {
    const [cookie, userId] = await global.signIn();

    return request(app)
      .post("/api/v1/cases/new")
      .set("Cookie", cookie)
      .send({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
        caseNo: "",
        parties: ["DWF"],
        caseDeadlines: [{}],
        owner: userId,
      })
      .expect(400);
  });

  it("Checks 400 for missing parties", async () => {
    const [cookie, userId] = await global.signIn();

    return request(app)
      .post("/api/v1/cases/new")
      .set("Cookie", cookie)
      .send({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
        caseNo: "HT-2019-XXXX",
        parties: [""],
        caseDeadlines: [{}],
        owner: userId,
      })
      .expect(400);
  });
});
