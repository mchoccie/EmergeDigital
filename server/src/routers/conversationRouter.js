const express = require("express");
const Conversation = require("../models/conversation");

const auth = require("../middleware/auth");
const router = express.Router();

/**
 * Get the conversation with a particular user. If it doesn't exist, create one.
 */
router.get("/:receiverId", auth, async (req, res) => {
  const caller = res.locals.caller;
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [caller._id.toString(), req.params.receiverId] },
    });

    if (!conversation) {
      const newConversation = new Conversation({
        members: [caller._id.toString(), req.params.receiverId],
      });
      conversation = await newConversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
