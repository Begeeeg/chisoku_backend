import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { signupService } from "../../service/auth.service";
import User from "../../../user/model/User.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Signup Service", () => {
    it("should create a new user successfully", async () => {
        const user = await signupService({
            givenname: "John",
            surname: "Doe",
            sex: "male",
            birthdate: new Date("1995-01-01"),
            address: "Test Street",
            mobile: "+123456789012",
            email: "john@example.com",
            username: "johndoe",
            password: "password123",
            confirmPassword: "password123",
            budget: 0, // ✅ add this
            role: "user", // ✅ add this
        });

        expect(user).toBeDefined();
        expect(user.username).toBe("johndoe");

        const dbUser = await User.findOne({ username: "johndoe" });
        expect(dbUser).not.toBeNull();
    });

    it("should throw error if email already exists", async () => {
        await signupService({
            givenname: "Jane",
            surname: "Doe",
            sex: "female",
            birthdate: new Date("1995-01-01"),
            address: "Test Street",
            mobile: "+123456789013",
            email: "jane@example.com",
            username: "janedoe",
            password: "password123",
            confirmPassword: "password123",
            budget: 0, // ✅ add this
            role: "user", // ✅ add this
        });

        await expect(
            signupService({
                givenname: "Test",
                surname: "User",
                sex: "male",
                birthdate: new Date("1995-01-01"),
                address: "Test Street",
                mobile: "+123456789014",
                email: "jane@example.com", // duplicate
                username: "testuser",
                password: "password123",
                confirmPassword: "password123",
                budget: 0, // ✅ add this
                role: "user", // ✅ add this
            })
        ).rejects.toThrow("Email already exists");
    });
});
