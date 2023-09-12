const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    6: Number,
    7: Number,
    8: Number,
    9: Number,
    10: Number,
    11: Number,
    12: Number,
    comment: String,
    timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
