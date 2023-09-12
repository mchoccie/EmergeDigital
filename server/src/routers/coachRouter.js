const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const auth = require("../middleware/auth");
const { checkCoach } = require("../middleware/checkType");
const router = express.Router();

/**
 * Get coach details
 */
router.get("/details", auth, checkCoach, async (req, res) => {
  return res.status(201).json(res.locals.caller);
});

/**
 * Update details
 */
router.patch("/details", auth, checkCoach, async (req, res) => {
  const { _id, token } = res.locals;

  const user = await User.findOneAndUpdate(
    { _id, token },
    { $set: req.body },
    { new: true }
  );

  return res.status(201).json(user);
});

router.patch("/updatepassword", auth, checkCoach, async (req, res) => {
  const { _id, token } = res.locals;

  var pass = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  const hashpass = bcrypt.hashSync(pass, salt);

  const user = await User.findOneAndUpdate(
    { _id, token },
    { $set: {"password": hashpass} },
    { new: true }
  );

  return res.status(201).json(user);
});

/**
 * Get method for finding one leader (by id)
 * leaderID if looking for a single leader
 */
router.get("/leader", auth, checkCoach, async (req, res) => {
  // Check whether to find one or find all
  if (req.body.match) {
    // Find user based off match
    const leader = await User.findOne(req.body.match);

    // Perform validity checks
    if (!leader) {
      return res.status(404).json("Could not find user");
    }

    if (!res.locals.caller.coach.leaders.includes(leader._id)) {
      return res.status(404).json("Matching user not linked to coach");
    }

    return res.status(201).json(leader);
  } else {
    // Return all leaders if a match is not given
    const leaders = res.locals.caller.coach.leaders;

    leader_details = [];

    for (const leaderID of leaders) {
      const leader = await User.findById(leaderID);

      leader_details.push(leader);
    }

    if (leader_details.length == 0 || !leader_details) {
      return res.status(404).json("No leaders found");
    } else {
      return res.status(201).json({ leader_details });
    }
  }
});

module.exports = router;
