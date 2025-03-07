"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// MongoDB URI from environment
const MONGO_URI = process.env.MONGO_URI || "";
// ✅ Define Schemas with TypeScript
const hostSchema = new mongoose_1.Schema({
    id: Number,
    city: String,
    state: String,
    address: String,
    zip: String,
    lat: String,
    long: String,
    short_name: String,
    full_name: String,
    phone: String,
});
const reviewSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    host: Number,
    review: String,
    visit: Boolean,
    visit_date: String,
    room: String,
    amenities: String,
});
// Create Models
const Hosts = mongoose_1.default.model("Hosts", hostSchema);
const Reviews = mongoose_1.default.model("Reviews", reviewSchema);
// Connect to MongoDB
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoose_1.default.connection.readyState === 0) {
            yield mongoose_1.default.connect(MONGO_URI, {
                serverSelectionTimeoutMS: 30000,
            });
            console.log("✅ MongoDB Connected Successfully");
        }
    });
}
// Lambda Handler Function
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀 Lambda function triggered", event);
    yield connectDB();
    try {
        if (event.path === "/") {
            return { statusCode: 200, body: JSON.stringify({ message: "Welcome to Mongoose API! 🔥" }) };
        }
        if (event.path === "/fetchHosts") {
            const hosts = yield Hosts.find();
            return { statusCode: 200, body: JSON.stringify(hosts) };
        }
        if (event.path.startsWith("/fetchHosts/") && event.httpMethod === "GET") {
            const state = event.path.split("/").pop();
            const hosts = yield Hosts.find({ state });
            return { statusCode: 200, body: JSON.stringify(hosts) };
        }
        if (event.path.startsWith("/fetchHost/") && event.httpMethod === "GET") {
            const id = parseInt(event.path.split("/").pop(), 10);
            const host = yield Hosts.findOne({ id });
            if (!host) {
                return { statusCode: 404, body: JSON.stringify({ error: "Host not found!" }) };
            }
            return { statusCode: 200, body: JSON.stringify(host) };
        }
        if (event.path === "/insert_review" && event.httpMethod === "POST") {
            const data = JSON.parse(event.body);
            const lastReview = yield Reviews.find().sort({ id: -1 }).limit(1);
            const new_id = lastReview.length ? lastReview[0].id + 1 : 1;
            const review = new Reviews({
                id: new_id,
                name: data.name,
                host: data.host,
                review: data.review,
                visit: true,
                visit_date: data.visit_date,
                room: data.room,
                amenities: data.amenities,
            });
            const savedReview = yield review.save();
            return { statusCode: 201, body: JSON.stringify(savedReview) };
        }
        return { statusCode: 404, body: JSON.stringify({ error: "Route not found" }) };
    }
    catch (error) {
        console.error("❌ Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
});
exports.handler = handler;
