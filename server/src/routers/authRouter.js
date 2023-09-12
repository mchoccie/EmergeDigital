const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * Post method for signing up
 */
router.post("/signup", async (req, res) => {
  /*req.body is the request body sent from the client 
  containing details during signup*/
  let { email, password, firstName, lastName } = req.body;

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
    let usertype = "leader";

    firstName = firstName.trim();
    lastName = lastName.trim();

    const newUser = new User({ email, password: hash, firstName, lastName });
    const accessToken = await newUser.generateAuthToken();

    res.cookie("token", `${accessToken}`, {
      httpOnly: true,
      sameSite: process.env.TYPE === "prod" ? "none" : "lax",
      secure: process.env.TYPE === "prod" ? true : false,
    });

    // temporary, will not be in production!
    return res.status(201).json({
      email,
      password,
      firstName,
      lastName,
      token: accessToken,
      userType: newUser.userType,
    });
  } else {
    return res.status(400).json("Email exists");
  }
});

/**
 * Post method for loggin the user in
 */
router.post("/login", async (req, res) => {
  /**
   * Take in the request body and store it in two variables
   */
  const { email, password } = req.body;

  /**
   * Check to see if the email actually exists
   */
  const userExists = await User.findOne({ email });

  /**
   * If the user does exist then compare passwords for a match.
   * If passwords match create a json web token to pass back
   * to client side
   */
  if (userExists) {
    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (passwordMatch) {
      const accessToken = await userExists.generateAuthToken();
      res.cookie("token", `${accessToken}`, {
        httpOnly: true,
        sameSite: process.env.TYPE === "prod" ? "none" : "lax",
        secure: process.env.TYPE === "prod" ? true : false,
      });
      return res.status(201).json({
        firstName: userExists.firstName,
        lastName: userExists.lastName,

        userType: userExists.userType,

        id: userExists._id,
      });
    } else {
      return res.status(401).json("Incorrect username/password");
    }
  } else {
    return res.status(401).json("Incorrect username/password");
  }
});

/**
 * Post method for logging the user out
 */
router.post("/logout", auth, async (req, res) => {
  const token = req.cookies.token;
  /**
   * Removing cookie from browser
   */
  res.clearCookie("token");

  /**
   * Deleting jwt from database
   */
  const user = await User.findOne({ token });
  user.token = undefined;

  await user.save();
  return res.status(201).json({ success: true });
});


async function resetPassword(userExists, email, pass) {
  /**
   * Check to see if the email actually exists
   */
  if (userExists) {
    var transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // never heard of env files
        user: process.env.RESET_EMAIL,
        pass: process.env.RESET_PASSWORD
      }
    });

    var mailOptions = {
      from: "emerge.reset.service@gmail.com",
      to: email,
      subject: "Password reset request",
      text: "Your new password is: " + pass,
    };

    let info = await transporter.sendMail(mailOptions);
    return info.accepted.length > 0;
  }
}

/**
 * Post method for resetting password
 */
router.post("/resetpass", cors({origin: true}), async (req, res) => {
  /**
   * Take in the request body and store it in two variables
   */
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  const { email } = req.body;
  const pass = Math.random().toString(36).substr(2, 8);
  const userExists = await User.findOne({ email });
  const success = await resetPassword(userExists, email, pass);
  if (success) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    userExists.password = hash;
    await userExists.save()
  }
  // Always respond with success to not reveal if email exists or not
  return res.status(201).json({ message: "A reset request has been made to your email address should it exist. Please check your spam folder." });
});

module.exports = router;
