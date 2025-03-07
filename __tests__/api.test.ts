import mongoose from "mongoose";
import request from "supertest";
import { handler } from "../index";
import { MongoMemoryServer } from "mongodb-memory-server";

// Mock environment variables
process.env.MONGO_URI = "mongodb://localhost:27017/testdb";

let mongoServer: MongoMemoryServer;

// Start  in-memory MongoDB server 
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  await mongoose.connect(process.env.MONGO_URI);
});

// Close MongoDB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("API Tests", () => {
  test("GET / should return welcome message", async () => {
    const event = { path: "/", httpMethod: "GET" };
    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toHaveProperty("message");
  });

  test("GET /fetchHosts should return an empty array initially", async () => {
    const event = { path: "/fetchHosts", httpMethod: "GET" };
    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual([]);
  });

  test("POST /insert_review should add a new review", async () => {
    const reviewData = {
      name: "John Doe",
      host: 1,
      review: "Great place!",
      visit_date: "2025-03-06",
      room: "Deluxe",
      amenities: "WiFi, Pool",
    };

    const event = {
      path: "/insert_review",
      httpMethod: "POST",
      body: JSON.stringify(reviewData),
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(201);
    const savedReview = JSON.parse(response.body);
    expect(savedReview.name).toBe("John Doe");
  });
});
