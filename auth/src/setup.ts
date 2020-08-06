/**
 * A helper function to configure the test environment
 * by configuring the mongoDB
 *
 * before any tests: connecting to the mongodb-memory-server
 * before each test: retrieving and deleting collections
 * after all tests: stopping and disconnecting the mongodb-memory-server
 *
 * Lastly, global is assigned the 'signIn' helper function that makes a
 * request to the sign-up resource and sets the cookie for authenticated requests
 */

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

let mongo: any;

beforeAll(async () => {
  const jwt_key = "abjjhjd";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

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
