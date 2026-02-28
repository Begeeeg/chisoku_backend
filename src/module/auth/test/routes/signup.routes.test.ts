import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../../app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

describe("POST /api/auth/signup", () => {
    it("should register a user and return 201", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                givenname: "John",
                surname: "Doe",
                sex: "male",
                birthdate: new Date("1995-01-01"),
                address: "Test Street",
                mobile: "+123456789015",
                email: "john2@example.com",
                username: "johndoe2",
                password: "password123",
                confirmPassword: "password123",
                role: "user",
                budget: 0,
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
        expect(res.body.data.username).toBe("johndoe2");
    });

    it("should fail if passwords do not match", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                givenname: "Jane",
                surname: "Doe",
                sex: "female",
                birthdate: new Date("1995-01-01"),
                address: "Test Street",
                mobile: "+123456789016",
                email: "jane2@example.com",
                username: "janedoe2",
                password: "password123",
                confirmPassword: "password456",
                role: "user",
                budget: 0,
            });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Passwords do not match");
    });
});
