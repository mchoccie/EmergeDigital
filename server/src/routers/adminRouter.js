const express = require("express");

const User = require("../models/user");
const auth = require("../middleware/auth");
const { checkAdmin } = require("../middleware/checkType");
const router = express.Router();
const bcrypt = require("bcryptjs");

/**
 * Get admin details
 */
router.get("/details", auth, checkAdmin, async (req, res) => {
  return res.status(201).json(res.locals.caller);
});

router.post("/link", auth, checkAdmin, async (req, res) => {
  console.log("Link called");
  // Body should contain 2 emails
  leaderEmail = req.body.leader;
  coachEmail = req.body.coach;

  // Check that both coach and leader exist
  const leader = await User.findOne({ email: leaderEmail });
  const coach = await User.findOne({ email: coachEmail });

  if (!leader || leader.userType !== "leader") {
    return res.status(404).json("No valid leader found");
  }

  if (!coach || coach.userType !== "coach") {
    return res.status(404).json("No valid coach found");
  }

  // Check that coach and leader are linked
  match = false;
  if (leader.leader.coachID && leader.leader.coachID.equals(coach._id))
    match = true;

  for (const obj of coach.coach.leaders) {
    if (obj.equals(leader._id)) match = true;
  }

  if (match) return res.status(401).json("Coach and leader are already linked");

  // Add leader to coach
  await User.updateOne(
    { _id: coach._id },
    {
      $addToSet: { "coach.leaders": leader._id },
    }
  );

  // Add coach to leader
  leader.leader.coachID = coach._id;
  leader.save();

  return res.status(201).json("Linked!");
});

router.post("/unlink", auth, checkAdmin, async (req, res) => {
  console.log("Unlink called");
  // Body should contain 2 emails
  leaderEmail = req.body.leader;
  coachEmail = req.body.coach;

  // Check that both coach and leader exist
  const leader = await User.findOne({ email: leaderEmail });
  const coach = await User.findOne({ email: coachEmail });

  if (!leader || leader.userType !== "leader") {
    return res.status(404).json("No valid leader found");
  }
  if (!coach || coach.userType !== "coach") {
    return res.status(404).json("No valid coach found");
  }

  // Check that coach and leader are linked
  match = false;
  if (leader.leader.coachID && !leader.leader.coachID.equals(coach._id))
    match = true;

  exists = false;
  for (const obj of coach.coach.leaders) {
    if (obj.equals(leader._id)) exists = true;
  }
  if (match || !exists)
    return res.status(401).json("Coach and leader are not linked");

  // Remove both
  leader.leader.coachID = undefined;
  leader.save();

  await User.updateOne(
    {
      _id: coach._id,
    },
    {
      $pullAll: { "coach.leaders": [leader._id] },
    }
  );

  return res.status(201).json("Unlinked!");
});

router.post("/create-coach", auth, checkAdmin, async (req, res) => {
  console.log("Create coach called");
  let { firstName, email, password, lastName } = req.body;

  /**
   * Searches DB for a match in user
   */
  const userExists = await User.findOne({ email });

  /**
   * If user doesn't already exist then make a new user.
   * Salt and Hash the password and store it in the database
   */
  if (!userExists) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    let userType = "coach";

    firstName = firstName.trim();
    lastName = lastName.trim();

    const newUser = new User({
      email,
      password: hash,
      firstName,
      lastName,
      userType,
    });
    const accessToken = await newUser.generateAuthToken();

    return res.status(201).json("Coach added poggers");
  } else {
    return res.status(400).json("Email exists");
  }
});

module.exports = router;
