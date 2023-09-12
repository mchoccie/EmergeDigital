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

beforeEach(async () => {
  await createCoach("coach@email.com", "password");
  await createLeader("leader@email.com", "password");

  await agent
    .post("/api/auth/login")
    .send({
      email: "leader@email.com",
      password: "password",
    })
    .expect(201);
});

describe("Test conversation creation", () => {
  it("should create a new conversation", async () => {
    const coach = await User.findOne({ email: "coach@email.com" }).exec();

    await agent.get("/api/conversation/" + coach._id).expect(200);
  });
  it("should should use existing conversation if it exists", async () => {
    const coach = await User.findOne({ email: "coach@email.com" }).exec();
    let convId;

    await agent
      .get("/api/conversation/" + coach._id)
      .expect(200)
      .then((res) => {
        convId = res.body._id;
      });
    await agent
      .get("/api/conversation/" + coach._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toEqual(convId);
      });
  });
});

async function makeConversation() {
  const coach = await User.findOne({ email: "coach@email.com" }).exec();

  const id = await agent
    .get("/api/conversation/" + coach._id)
    .expect(200)
    .then((res) => {
      return res.body._id;
    });

  return id;
}
describe("Test messaging", () => {
  it("should be able to send messages ", async () => {
    const convId = await makeConversation();

    await agent.post("/api/message/").send({
      text: "Hello",
      conversationId: convId,
    });
  });

  it("should be able to get messages", async () => {
    const convId = await makeConversation();

    await agent.post("/api/message/").send({
      text: "Hello",
      conversationId: convId,
    });
    await agent.post("/api/message/").send({
      text: "Hello2",
      conversationId: convId,
    });

    await agent
      .get("/api/message/" + convId)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body.length).toEqual(2);
      });
  });
});
