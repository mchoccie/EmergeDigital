const request = require("supertest");
process.env.TYPE = "test";
const { app, server } = require("../src/server");

const db = require("./db-handler");
const User = require("../src/models/user");

beforeAll(async () => db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => {
  db.closeDatabase();
  server.close();
});

describe("Test server creation", () => {
  it("should return a response", async () => {
    const res = await request(app).get("/").send({});
    expect(res.statusCode).toEqual(200);
  });
});

describe("Test Local MongoDb Server creation", () => {
  it("can be created correctly", async () => {
    const user = new User();
    user.firstName = "Jon";
    user.lastName = "Jon";
    user.email = "Jon@";
    user.password = "aspdiof";
    await user.save();
    const postInDb = await User.findOne({ firstName: "Jon" }).exec();
    expect(postInDb.firstName).toEqual("Jon");
  });
});
