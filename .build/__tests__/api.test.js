"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../index");
const mongodb_memory_server_1 = require("mongodb-memory-server");
// Mock environment variables
process.env.MONGO_URI = "mongodb://localhost:27017/testdb";
let mongoServer;
// Start  in-memory MongoDB server 
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
    yield mongoose_1.default.connect(process.env.MONGO_URI);
}));
// Close MongoDB connection after tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("API Tests", () => {
    test("GET / should return welcome message", () => __awaiter(void 0, void 0, void 0, function* () {
        const event = { path: "/", httpMethod: "GET" };
        const response = yield (0, index_1.handler)(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toHaveProperty("message");
    }));
    test("GET /fetchHosts should return an empty array initially", () => __awaiter(void 0, void 0, void 0, function* () {
        const event = { path: "/fetchHosts", httpMethod: "GET" };
        const response = yield (0, index_1.handler)(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([]);
    }));
    test("POST /insert_review should add a new review", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield (0, index_1.handler)(event);
        expect(response.statusCode).toBe(201);
        const savedReview = JSON.parse(response.body);
        expect(savedReview.name).toBe("John Doe");
    }));
});
