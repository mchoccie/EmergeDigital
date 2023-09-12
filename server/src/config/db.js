/**
 * Start connection with mongoDB database using environment variable
 */
if (process.env.TYPE !== "test") {
  const mongoose = require("mongoose");
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
      console.log("Connected to mongoDB database!");
    })
    .catch((err) => {
      console.log("Failed to connect to database!", err);
    });
}
