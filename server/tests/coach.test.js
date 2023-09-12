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

describe("Test coach leader linking", () => {
  beforeEach(async () => {
    await createCoach("coach@email.com", "password");
    await createLeader("leader@email.com", "password");

    await agent.post("/api/auth/login").send({
      email: "coach@email.com",
      password: "password",
    });
  });

  async function link() {
    // Manually link coach and leader
    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    const coach = await User.findOne({ email: "coach@email.com" }).exec();
    coach.coach.leaders.push(leader._id);
    await coach.save();
    leader.leader.coachID = coach._id;
    await leader.save();
  }

  it("should return when no leaders linked", async () => {
    await agent.get("/api/coach/leader").send().expect(404);
  });

  it("should be able to retrieve all linked leader", async () => {
    await link();

    await agent.get("/api/coach/leader").send().expect(201);
  });

  it("should be able to retrieve linked leaders by match", async () => {
    await link();

    await agent
      .get("/api/coach/leader")
      .send({
        match: {
          email: "leader@email.com",
        },
      })
      .expect(201);
  });

  it("should be able to handle invalid requests", async () => {
    await agent
      .get("/api/coach/leader")
      .send({
        match: {
          email: "noleader@email.com",
        },
      })
      .expect(404);

    await agent
      .get("/api/coach/leader")
      .send({
        match: {
          email: "leader@email.com",
        },
      })
      .expect(404);
  });
});

describe("Test coach details", () => {
  beforeEach(async () => {
    await createCoach("coach@email.com", "password");
    await agent.post("/api/auth/login").send({
      email: "coach@email.com",
      password: "password",
    });
  });

  it("should be able to retrieve coach details", async () => {
    await agent.get("/api/coach/details").send().expect(201);
  });

  it("should be able to edit coach details", async () => {
    await agent
      .patch("/api/coach/details")
      .send({
        firstName: "New",
      })
      .expect(201);

    const coach = await User.findOne({ email: "coach@email.com" }).exec();
    expect(coach.firstName).toEqual("New");
  });
});
