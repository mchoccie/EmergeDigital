const mongoose = require("mongoose");

/**
 * Schema for holding a goal for a leader
 *
 */
const actionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  max_iterations: { type: Number, default: 1 },
  current_iterations: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

const goalSchema = new mongoose.Schema({
  subgoal: { type: String, required: true },

  actions: [actionSchema],
});

module.exports = { goalSchema, actionSchema };
