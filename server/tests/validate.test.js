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

async function createUser() {
  await request(app).post("/api/auth/signup").send({
    firstName: "Sam",
    lastName: "Chen",
    email: "user@email.com",
    password: "password",
  });
}

describe("Test validation path", () => {
  it("can be called", async () => {
    await createUser();
    await agent
      .post("/api/auth/login")
      .send({ email: "user@email.com", password: "password" });
    await agent.get("/api/validate").send().expect(201);
  });
});
