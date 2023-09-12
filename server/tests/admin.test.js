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

async function createCoach(email, password) {
  await agent
    .post("/api/auth/signup")
    .send({
      email: email,
      password: password,
      firstName: "Coach",
      lastName: "Demo",
    })
    .expect(201);
  await agent.post("/api/auth/logout").send().expect(201);

  // let coach = await User.findOne({ email: email }).exec();
  // coach.type = "coach";

  await User.findOneAndUpdate({ email: email }, { userType: "coach" }).exec();
  const coach = await User.findOne({ email: email }).exec();
  expect(coach.userType).toEqual("coach");
}

async function createAdmin(email, password) {
  await agent
    .post("/api/auth/signup")
    .send({
      email: email,
      password: password,
      firstName: "Admin",
      lastName: "Demo",
    })
    .expect(201);
  await agent.post("/api/auth/logout").send().expect(201);

  await User.findOneAndUpdate({ email: email }, { userType: "admin" }).exec();
  const coach = await User.findOne({ email: email }).exec();
  expect(coach.userType).toEqual("admin");
}

async function createLeader(email, password) {
  await agent
    .post("/api/auth/signup")
    .send({
      email: email,
      password: password,
      firstName: "Leader",
      lastName: "Demo",
    })
    .expect(201);
  await agent.post("/api/auth/logout").send().expect(201);
}

describe("Test admin details", () => {
  beforeEach(async () => {
    await createAdmin("admin@email.com", "password");
    await createCoach("coach@email.com", "password");
    await createLeader("leader@email.com", "password");
    await agent
      .post("/api/auth/login")
      .send({
        email: "admin@email.com",
        password: "password",
      })
      .expect(201);
  });

  it("should be able to retrieve admin details", async () => {
    await agent.get("/api/admin/details").send().expect(201);
    const admin = await User.findOne({ email: "admin@email.com" }).exec();
    expect(admin.email).toEqual("admin@email.com");
    expect(admin.userType).toEqual("admin");
  });
});

describe("Test linking / unlinking", () => {
  beforeEach(async () => {
    await createAdmin("admin@email.com", "password");
    await createCoach("coach@email.com", "password");
    await createLeader("leader@email.com", "password");
    await agent
      .post("/api/auth/login")
      .send({
        email: "admin@email.com",
        password: "password",
      })
      .expect(201);
  });

  it("should be able to link leaders and coaches", async () => {
    await agent
      .post("/api/admin/link")
      .send({
        leader: "leader@email.com",
        coach: "coach@email.com",
      })
      .expect(201);
  });

  it("should be able to catch invalid leaders/coaches", async () => {
    await agent
      .post("/api/admin/link")
      .send({
        leader: "leader@email.com",
        coach: "wrongcoach@email.com",
      })
      .expect(404);
    await agent
      .post("/api/admin/link")
      .send({
        leader: "wrongleader@email.com",
        coach: "coach@email.com",
      })
      .expect(404);
  });

  it("should not link coaches and leaders that are already linked", async () => {
    await agent
      .post("/api/admin/link")
      .send({
        leader: "leader@email.com",
        coach: "coach@email.com",
      })
      .expect(201);
    await agent
      .post("/api/admin/link")
      .send({
        leader: "leader@email.com",
        coach: "coach@email.com",
      })
      .expect(401);
  });

  it("should be able to unlink linked leaders and coaches", async () => {
    await agent
      .post("/api/admin/link")
      .send({
        leader: "leader@email.com",
        coach: "coach@email.com",
      })
      .expect(201);

    await agent
      .post("/api/admin/unlink")
      .send({
        leader: "leader@email.com",
        coach: "coach@email.com",
      })
      .expect(201);
  });

  it("should be able to detect invalid leaders and coaches in unlink", async () => {
    await agent
      .post("/api/admin/unlink")
      .send({
        leader: "wrongleader@email.com",
        coach: "coach@email.com",
      })
      .expect(404);
    await agent
      .post("/api/admin/unlink")
      .send({
        leader: "leader@email.com",
        coach: "wrongcoach@email.com",
      })
      .expect(404);
  });

  it("shouldn't unlink leaders and coaches that aren't already linked", async () => {
    await agent
      .post("/api/admin/unlink")
      .send({
        leader: "leader@email.com",
        coach: "coach@email.com",
      })
      .expect(401);
  });
});

describe("Test create coach", () => {
  beforeEach(async () => {
    await createAdmin("admin@email.com", "password");
    await createCoach("coach@email.com", "password");
    await createLeader("leader@email.com", "password");
    await agent
      .post("/api/auth/login")
      .send({
        email: "admin@email.com",
        password: "password",
      })
      .expect(201);
  });

  it("should be able to create a coach", async () => {
    await agent
      .post("/api/admin/create-coach")
      .send({
        firstName: "Coach",
        lastName: "Fromadmin",
        email: "coach@admin.com",
        password: "password",
      })
      .expect(201);

    const coach = await User.findOne({ email: "coach@admin.com" }).exec();
    expect(coach.email).toEqual("coach@admin.com");
  });

  it("shouldn't create coach if one already exists", async () => {
    await agent
      .post("/api/admin/create-coach")
      .send({
        firstName: "Coach",
        lastName: "Fromadmin",
        email: "coach@email.com",
        password: "password",
      })
      .expect(400);
  });
});
