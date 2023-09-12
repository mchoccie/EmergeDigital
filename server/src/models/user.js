const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { goalSchema } = require("./goal");

/**
 * Current user schema store in MONGODB. Consists of:
 * Email
 * Password
 * Name
 * Last Name
 * Token
 * (More schema may be added later on for different purposes)
 *
 * User
 *  * Required on signup
 *    Email
 *    Password
 *    First Name
 *    Last Name
 *    Type (leader / coach / undefined)
 *  Token
 *
 *  * Additional Common Details (questionairre or whatevs)
 *    Age
 *    Primary Goal
 *    Secondary Goal
 *    Middle Name
 *    Industry
 *      Years in industry
 *    Gender
 *    Phone Number
 *  * Leader
 *    Coach
 *
 *
 *  * Coach
 *    About
 *    Education / Experience
 *    Philosophy
 *    Approaches
 *    Calendly Link
 *    Arr[userids]
 *
 */

const userSchema = new mongoose.Schema({
  token: String,

  // Required Signup Fields
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ["leader", "coach", "admin"],
    default: "leader",
    required: true,
  },

  // Additional personal details
  age: Number,
  middleName: String,
  gender: String,
  phone: Number,

  // Coaching related details
  targetGoals: [String],
  industry: {
    name: String,
    years: Number,
  },

  // Leader specific
  leader: {
    coachID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    goals: {
      main: String,
      subgoals: [goalSchema],
    },
  },

  // Coach specific
  coach: {
    about: String,
    experience: String,
    philosophy: String,
    approaches: String,
    calendlyLink: String,
    leaders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});

/**
 * NOTE: "secretKey must be changed and put into an .env file
 * This is just for temporary testing purposes"
 *
 * @returns {String} - JWT token
 */
userSchema.methods.generateAuthToken = async function () {
  const accessToken = jwt.sign({ _id: this._id.toString() }, "secretKey");

  this.token = accessToken;
  await this.save();

  return accessToken;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.token;

  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
