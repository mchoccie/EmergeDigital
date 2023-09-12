const express = require("express");
const Feedback = require("../models/feedback");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const coachID = res.locals.caller.leader.coachID;

  if (!coachID) {
    return res.status(404).json("No coach registered");
  }

  const newFeedback = new Feedback({
    senderId: res.locals.caller._id.toString(),
    receiverId: coachID,
    1: req.body[1],
    2: req.body[2],
    3: req.body[3],
    4: req.body[4],
    5: req.body[5],
    6: req.body[6],
    7: req.body[7],
    8: req.body[8],
    9: req.body[9],
    10: req.body[10],
    11: req.body[11],
    12: req.body[12],
    comment: req.body.comment,
  });

  try {
    const savedFeedback = await newFeedback.save();
    res.status(200).json(savedFeedback);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Get all feedback for a specific coach
 */
router.get("/", auth, async (req, res) => {
  try {
    const feedback = await Feedback.find({
      receiverId: res.locals.caller._id,
    });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
