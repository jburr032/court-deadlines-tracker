import { app } from "./app";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  namespace NodeJS {
    interface Global {
      signIn(): Promise<string[]>;
    }
  }
}

global.signIn = async () => {
  const response = await request(app)
    .post("/api/v1/sign-up")
    .send({
      signUpEmail: "test@test.com",
      password: "password",
      username: "my_username",
    })
    .expect(201);

  // Returns string[]
  const cookie = response.get("Set-Cookie");
  const userId = response.body.id;

  return [cookie, userId];
};
