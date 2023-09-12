const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");
const auth = require("../middleware/auth");
const { checkAdmin } = require("../middleware/checkType");

const router = express.Router();

/**
 * Add / update coach
 *
 * Body
 * {
 *  match {
 *    items to match with the coach
 * }
 * }
 */

/**
 * Match the leader with a coach
 */
router.post("/", auth, async (req, res) => {
  var util = require("util");
  const spawn = require("child_process").spawn;

  // the result from questionnaire is hardcoded as strings here, not sure how to retreive the actual data
  // may need to ask someone for help
  const { primaryGoal, secondaryGoal, industry, gender, age } = req.body;
  const id = res.locals.caller._id;
  const type = res.locals.caller.userType;

  /**
   * Perform some checking that it is a valid user calling (not admin)
   */

  if (type !== "leader" && type !== "coach") {
    return res.status(401).json("Invalid user type.");
  }

  /**
   * This was just me debugging the things we pass into the python file
   */
  const args = [
    "./ai.py", // I changed this so that it works
    primaryGoal,
    secondaryGoal,
    industry,
    gender,
    age,
    type,
    id.toString(),
    "real",
  ];
  console.log(args);

  /**
   * All this stuff below is just initing the python process,
   * as well as actually printing out the output from the python file.
   */
  var uint8arrayToString = function (data) {
    return String.fromCharCode.apply(null, data);
  };

  const scriptExecution = spawn("python3", args);
  // Handle normal output
  scriptExecution.stdout.on("data", (data) => {
    console.log(uint8arrayToString(data));
  });

  // Handle error output
  scriptExecution.stderr.on("data", (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
  });

  // Exit message
  scriptExecution.on("exit", (code) => {
    console.log("Process quit with code : " + code);
  });

  //pythonProcess.stdout.on('data', (data) => {
  // Do something with the data returned from python script
  //});
  //return res.status(201).json(res.locals.caller);
  return res.status(201).json("Information has been submitted");
});

/**
 * Router method to get all matched leaders and coaches
 * Only callable by admins
 *
 * UNFINISHED
 */
router.get("/:userId", auth, checkAdmin, async (req, res) => {
  /**
   *
   */
  const userId = req.params.userId;

  if (!userId) {
    // If no user id provided, fetch all matches.
  } else {
  }

  return res.json();
});

module.exports = router;
