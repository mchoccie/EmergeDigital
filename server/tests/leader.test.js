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

describe("Test leader coach linking", () => {
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

  it("can show when no coach linked", async () => {
    await agent.get("/api/leader/coach").send().expect(404);
  });

  it("can fetch linked coach", async () => {
    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    const coach = await User.findOne({ email: "coach@email.com" }).exec();

    leader.leader.coachID = coach._id;
    await leader.save();

    await agent
      .get("/api/leader/coach")
      .send()
      .expect(201)
      .then((res) => {
        expect(res.body.email).toEqual("coach@email.com");
      });
  });
});

describe("Test leader detail fetching", () => {
  beforeEach(async () => {
    await createLeader("leader@email.com", "password");
    await agent
      .post("/api/auth/login")
      .send({
        email: "leader@email.com",
        password: "password",
      })
      .expect(201);
  });

  it("should be able to retrieve leader details", async () => {
    await agent
      .get("/api/leader/details")
      .send()
      .expect(201)
      .then((res) => {
        expect(res.body.email).toEqual("leader@email.com");
      });
  });

  it("should be able to update leader details", async () => {
    await agent
      .patch("/api/leader/details")
      .send({
        firstName: "New",
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(leader.firstName).toEqual("New");
  });
});

describe("Test leader subgoals", () => {
  beforeEach(async () => {
    await createLeader("leader@email.com", "password");
    await agent
      .post("/api/auth/login")
      .send({
        email: "leader@email.com",
        password: "password",
      })
      .expect(201);
  });

  it("should handle bad requests", async () => {
    await agent.post("/api/leader/subgoal").send().expect(400);
  });

  it("should be able to create a new subgoal", async () => {
    await agent
      .post("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(leader.leader.goals.subgoals[0].subgoal).toEqual("Sub");
  });

  it("should be able prevent identical subgoals", async () => {
    await agent
      .post("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(201);
    await agent
      .post("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(409);
  });

  it("should be able to delete all subgoals", async () => {
    await agent
      .post("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(201);
    await agent.delete("/api/leader/subgoal").send().expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(leader.leader.goals.subgoals.length).toEqual(0);
  });

  it("should be able to delete one subgoal", async () => {
    await agent
      .post("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(201);
    await agent
      .delete("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(leader.leader.goals.subgoals.length).toEqual(0);
  });
});

describe("Test actions", () => {
  beforeEach(async () => {
    await createLeader("leader@email.com", "password");
    await agent
      .post("/api/auth/login")
      .send({
        email: "leader@email.com",
        password: "password",
      })
      .expect(201);
    await agent
      .post("/api/leader/subgoal")
      .send({
        subgoal: "Sub",
      })
      .expect(201);
  });

  it("should be able to create a new action", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "1",
        },
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(leader.leader.goals.subgoals[0].actions[0].name).toEqual("Act");
  });

  it("should be able to handle malformed requests", async () => {
    await agent.post("/api/leader/subgoal/action").send().expect(400);
  });

  it("should be able to handle nonexistent subgoals", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Wrong",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "1",
        },
      })
      .expect(401);
  });

  it("should be able to handle duplicated actions", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "1",
        },
      })
      .expect(201);
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "1",
        },
      })
      .expect(401);
  });

  it("should be able to delete an action", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "1",
        },
      })
      .expect(201);

    await agent
      .delete("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(leader.leader.goals.subgoals[0].actions.length).toEqual(0);
  });

  it("should be able to handle nonexistent actions", async () => {
    await agent
      .delete("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(404);
    await agent
      .patch("/api/leader/subgoal/action/increment")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(404);
    await agent
      .patch("/api/leader/subgoal/action/decrement")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(404);
  });

  it("should be able to increment actions", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "1",
        },
      })
      .expect(201);

    await agent
      .patch("/api/leader/subgoal/action/increment")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(
      leader.leader.goals.subgoals[0].actions[0].current_iterations
    ).toEqual(2);
  });

  it("shouldn't increment already completed actions", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "2",
          current_iterations: "1",
        },
      })
      .expect(201);

    await agent
      .patch("/api/leader/subgoal/action/increment")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(201);

    await agent
      .patch("/api/leader/subgoal/action/increment")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(401);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(
      leader.leader.goals.subgoals[0].actions[0].current_iterations
    ).toEqual(2);
  });

  it("should be able to decrement actions", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "3",
          current_iterations: "3",
        },
      })
      .expect(201);

    await agent
      .patch("/api/leader/subgoal/action/decrement")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(201);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(
      leader.leader.goals.subgoals[0].actions[0].current_iterations
    ).toEqual(2);
  });

  it("shouldn't decrement when progress at 0", async () => {
    await agent
      .post("/api/leader/subgoal/action")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
          max_iterations: "2",
          current_iterations: "1",
        },
      })
      .expect(201);

    await agent
      .patch("/api/leader/subgoal/action/decrement")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(201);

    await agent
      .patch("/api/leader/subgoal/action/decrement")
      .send({
        subgoal: "Sub",
        action: {
          name: "Act",
        },
      })
      .expect(401);

    const leader = await User.findOne({ email: "leader@email.com" }).exec();
    expect(
      leader.leader.goals.subgoals[0].actions[0].current_iterations
    ).toEqual(0);
  });
});
