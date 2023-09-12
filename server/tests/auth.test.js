const request = require("supertest");
process.env.TYPE = "test";
const { app, server } = require("../src/server");

const db = require("./db-handler");
const User = require("../src/models/user");
const agent = request.agent(app);

beforeAll(async () => db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => {
  db.closeDatabase();
  server.close();
});

describe("Test signup", () => {
  it("can create a new user", async () => {
    const body = {
      email: "user@email.com",
      password: "password",
      firstName: "Sam",
      lastName: "Chen",
    };

    await agent.post("/api/auth/signup").send(body).expect(201);
    const postInDb = await User.findOne({ email: "user@email.com" }).exec();
    expect(postInDb.firstName).toEqual("Sam");
  });
  it("can't create user with same details", async () => {
    const body = {
      email: "user@email.com",
      password: "password",
      firstName: "Sam",
      lastName: "Chen",
    };
    await agent.post("/api/auth/signup").send(body).expect(201);
    await agent.post("/api/auth/signup").send(body).expect(400);
  });
});

async function createUser() {
  await request(app).post("/api/auth/signup").send({
    firstName: "Sam",
    lastName: "Chen",
    email: "user@email.com",
    password: "password",
  });
}

describe("Test login", () => {
  beforeEach(async () => {
    await createUser();
  });
  it("can login", async () => {
    body = {
      email: "user@email.com",
      password: "password",
    };
    await agent.post("/api/auth/login").send(body).expect(201);
  });
  it("cannot login with invalid credentials", async () => {
    let res;
    body = {
      email: "wronguser@email.com",
      password: "password",
    };
    await agent.post("/api/auth/login").send(body).expect(401);
    body = {
      email: "user@email.com",
      password: "wrongpassword",
    };
    await agent.post("/api/auth/login").send(body).expect(401);
  });
});

describe("Test logout", () => {
  beforeEach(async () => {
    await createUser();
  });

  it("should logout logged in user", async () => {
    body = { email: "user@email.com", password: "password" };

    await agent.post("/api/auth/login").send(body).expect(201);
    await agent.post("/api/auth/logout").send().expect(201);
  });

  it("should not log out if not logged in", async () => {
    await agent.post("/api/auth/logout").send().expect(401);
  });
});
