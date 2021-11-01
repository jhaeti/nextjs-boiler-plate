const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../src/app");

const User = require("../src/models/user");

const userOne = {
    name: "Ibrahim",
    email: "ibrahim@example.com",
    password: "ibrahim123",
};

const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "Ibrahim123",
    email: "ibrahim123@example.com",
    password: "ibrahim123",
    tokens: [
        { token: jwt.sign({ id: userTwoId }, process.env.JWT_SECRET_KEY) },
    ],
};
beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
});

test("Should not register a user if all fields are not provided", async () => {
    const response1 = await request(app)
        .post("/users/register")
        .send({ name: "Jhae", email: "jhae2@example.com" })
        .expect(400);
    expect(response1.body).not.toBeNull();
    expect(response1.body).toBe("Please enter all fields");

    const response2 = await request(app)
        .post("/users/register")
        .send({ email: "jhae2@example.com", password: "jhae12345" })
        .expect(400);
    expect(response2.body).not.toBeNull();
    expect(response2.body).toBe("Please enter all fields");
});

test("Should fail to register a user if the user already exist", async () => {
    const response1 = await request(app)
        .post("/users/register")
        .send(userOne)
        .expect(400);
    expect(response1.body).not.toBeNull();
    expect(response1.body).toBe("User already exist");
});

test("Should register a new User", async () => {
    const response1 = await request(app)
        .post("/users/register")
        .send({
            name: "Ti Jhae",
            email: "jhae1@example.com",
            password: "jhae123",
        })
        .expect(201);
    const user = await User.findOne({
        email: "jhae1@example.com",
    }).select("-date");

    // testing whether user was found in database
    expect(user).not.toBeNull();

    // test whether cookie is set when registering user
    expect(response1.header["set-cookie"][0].split("=")[0]).toBe(
        process.env.AUTH_COOKIE_NAME
    );
});

test("Should login user", async () => {
    let response1 = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password,
        })
        .expect(200);
    expect(response1.header["set-cookie"][0].split("=")[0]).toBe(
        process.env.AUTH_COOKIE_NAME
    );
    expect(response1.status).toBe(200);
});

test("Should not login user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "168896@example.com",
            password: userOne.password,
        })
        .expect(400);
});

test("Should not login user if password does not match", async () => {
    let res = await request(app).post("/res/login").send({
        email: userOne.email,
        password: "ibrahim1223",
    });
    res = JSON.stringify(res);
    res = JSON.parse(res);
    expect(res.header["set-cookie"]).toBe(undefined);
    expect(res.status).toBe(404);
});

test("Should fetch user data if cookie is set correctly", async () => {
    const response1 = request(app)
        .get("/users/me")
        .set(
            "Cookie",
            `${process.env.AUTH_COOKIE_NAME}=${userTwo.tokens[0].token}`
        )
        .expect(200);

    expect(response1.body).not.toBeNull();
});
