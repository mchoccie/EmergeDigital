require("dotenv").config({ path: "./src/config/dev.env" });
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
require("./config/db");

const authRouter = require("./routers/authRouter");
const validateRouter = require("./routers/validateRouter");

const { application } = require("express");
const leaderRouter = require("./routers/leaderRouter");
const coachRouter = require("./routers/coachRouter");
const adminRouter = require("./routers/adminRouter");
const conversationRouter = require("./routers/conversationRouter");
const messageRouter = require("./routers/messageRouter");
const feedbackRouter = require("./routers/feedbackRouter");
const aiRouter = require("./routers/aiRouter");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: true,
  },
});
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/**
 * Express router. This section runs the authentication code
 * from authrouter.
 */
app.use("/api/auth", authRouter);

/**
 * Express router. This section runs the routes specified in validateRouter
 */
app.use("/api/validate", validateRouter);

app.use("/api/leader", leaderRouter);
app.use("/api/coach", coachRouter);
app.use("/api/admin", adminRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/ai", aiRouter);

// // landing page response
// app.get("/", (req, res) => {
//   res.send("Express server is alive!");
// });

// // 404 page response
// app.get("*", (req, res) => {
//   res.status(404).send("404 Page not found!");
// });

// starting up express server

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/**
 * Socket.io for messaging
 */

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("socket: a user connected.");

  socket.on("addUser", (userId) => {
    // Verify user exists

    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");

    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use(express.static(__dirname + "../../../client/build/"));
app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "../../../client/build" });
});

module.exports = { app, server };
