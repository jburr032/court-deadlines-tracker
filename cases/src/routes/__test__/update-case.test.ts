import request from "supertest";

import { app } from "../../app";

describe("Test for update-case route", () => {
  // Checks for errors
  it("Checks for 404 for case not found", () => {});
  it("Checks for 401 for unauthorized request", () => {});

  // Checks for unsuccessful updates to individual params
  it("Checks for 400 for missing case number", () => {});
  it("Checks for 400 for missing parties", () => {});
  it("Checks for 400 for missing owner", () => {});

  // Checks for successful updates
  it("Checks for 200 for valid update of deadlines", () => {});
  it("Checks for 200 for valid update of case number", () => {});
  it("Checks for 200 for valid update of parties", () => {});
  it("Checks for 200 for valid update of addedUsers", () => {});
  it("Checks for 200 for valid update of owner", () => {});
});
