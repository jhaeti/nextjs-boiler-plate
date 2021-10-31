const request = require("supertest");

const app = require("../src/app");

const User = require("../src/models/user");

const userOne = {
    name: "Ibrahim",
    email: "ibrahim@example.com",
    password: "ibrahim123",
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test("Should register a new User", async () => {
    await request(app)
        .post("/users/register")
        .send({
            name: "Ti Jhae",
            email: "jhae@example.com",
            password: "jhae123",
        })
        .expect(201);
});

test("Should login user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password,
        })
        .expect(200);
});

test("Should not login user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "ibrahim1@example.com",
            password: userOne.password,
        })
        .expect(400);
});

test("Should not login user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: "ibrahim1223",
        })
        .expect(400);
});
