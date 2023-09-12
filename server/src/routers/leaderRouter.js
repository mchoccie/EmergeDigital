const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const auth = require("../middleware/auth");
const { checkLeader } = require("../middleware/checkType");

const router = express.Router();

/**
 * Get current linked coach
 */
router.get("/coach", auth, checkLeader, async (req, res) => {
  const coachID = res.locals.caller.leader.coachID;

  if (!coachID) {
    return res.status(404).json("No coach registered");
  }

  const coach = await User.findById(coachID);

  return res.status(201).json(coach);
});

/**
 * Get leader details
 */
router.get("/details", auth, checkLeader, async (req, res) => {
  return res.status(201).json(res.locals.caller);
});

/**
 * Update details
 */
router.patch("/details", auth, checkLeader, async (req, res) => {
  const { _id, token } = res.locals;

  const user = await User.findOneAndUpdate(
    { _id, token },
    { $set: req.body },
    { new: true }
  );

  return res.status(201).json(user);
});

router.patch("/updatepassword", auth, checkLeader, async (req, res) => {
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
 * Add sub-goal
 */
router.post("/subgoal", auth, checkLeader, async (req, res) => {
  const { _id, token } = res.locals;

  if (!req.body.subgoal) {
    return res.status(400).json("Must include subgoal name as 'subgoal'");
  }

  const exists = await User.findOne({
    _id,
    token,
    "leader.goals.subgoals.subgoal": req.body.subgoal,
  });

  if (exists) {
    return res
      .status(409)
      .json({ error: "Subgoal with the same name already exists", exists });
  }

  const user = await User.findOneAndUpdate(
    { _id, token },
    {
      $addToSet: {
        "leader.goals.subgoals": { subgoal: req.body.subgoal, actions: [] },
      },
    },
    { new: true }
  );

  return res.status(201).json(user);
});

/**
 * Remove sub-goal
 */
router.delete("/subgoal", auth, checkLeader, async (req, res) => {
  const { _id, token } = res.locals;
  let user = undefined;
  if (req.body.subgoal) {
    console.log("Deleting one ");
    user = await User.findOneAndUpdate(
      { _id, token },
      {
        $pull: {
          "leader.goals.subgoals": { subgoal: req.body.subgoal },
        },
      },
      { new: true }
    );
  } else {
    // Delete all subgoals
    user = await User.findOneAndUpdate(
      { _id, token },
      { $unset: { "leader.goals.subgoals": "" } },
      { new: true }
    );
  }
  return res.status(201).json(user);
});

/**
 * Action helper methods
 */

const findAction = (req, res) => {
  // See if action with same name already exists
  const exists = res.locals.caller.leader.goals.subgoals
    .find((element) => element.subgoal === req.body.subgoal)
    ?.actions.filter((action) => action.name === req.body.action.name);

  return exists;
};

/**
 * Add action
 */
router.post("/subgoal/action", auth, checkLeader, async (req, res) => {
  const { _id, token } = res.locals;

  if (!req.body.action || !req.body.subgoal) {
    return res.status(400).json("Badly formed request");
  }

  const exists = findAction(req, res);

  if (!exists) {
    return res.status(401).json("Subgoal does not exist");
  }

  if (exists.length != 0) {
    return res.status(401).json("Action with same name already exists");
  }

  user = await User.findOneAndUpdate(
    { _id, token, "leader.goals.subgoals.subgoal": req.body.subgoal },
    { $push: { "leader.goals.subgoals.$.actions": req.body.action } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json("Could not update action");
  }

  return res.status(201).json(user);
});

/**
 * Delete action
 */
router.delete("/subgoal/action", auth, checkLeader, async (req, res) => {
  const { _id, token } = res.locals;

  const action = findAction(req, res);

  if (!action || action.length === 0) {
    return res.status(404).json("Could not find action");
  }

  const user = await User.findOneAndUpdate(
    { _id, token, "leader.goals.subgoals.subgoal": req.body.subgoal },
    {
      $pull: {
        "leader.goals.subgoals.$.actions": { name: req.body.action.name },
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json("Could not delete action");
  }

  return res.status(201).json(user);
});

/**
 * Increment Action
 */
router.patch(
  "/subgoal/action/increment",
  auth,
  checkLeader,
  async (req, res) => {
    const exists = findAction(req, res);

    if (!exists || exists.length === 0) {
      return res.status(404).json("Could not find action");
    }

    action = exists[0];

    if (action.completed) {
      return res.status(401).json("Action is already completed");
    }

    action.current_iterations += 1;

    if (action.current_iterations === action.max_iterations) {
      action.completed = true;
    }
    res.locals.caller.save();

    return res.status(201).json(res.locals.caller);
  }
);

/**
 * Decrement Action
 */
router.patch(
  "/subgoal/action/decrement",
  auth,
  checkLeader,
  async (req, res) => {
    const exists = findAction(req, res);

    if (!exists || exists.length === 0) {
      return res.status(404).json("Could not find action");
    }

    action = exists[0];

    if (action.current_iterations === 0) {
      return res.status(401).json("Progress is at 0");
    }

    action.current_iterations -= 1;
    action.completed = false;

    res.locals.caller.save();

    return res.status(201).json(res.locals.caller);
  }
);

module.exports = router;
