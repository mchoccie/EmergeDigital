const express = require("express");
const Message = require("../models/message");

const auth = require("../middleware/auth");
const router = express.Router();

/**
 * Save a message to the databsae
 * body: {
 *    conversationId,
 *    text,
 * }
 */
router.post("/", auth, async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    text: req.body.text,
    sender: res.locals.caller._id.toString(),
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Gets all messages from a certain conversation
 */
router.get("/:conversationId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
