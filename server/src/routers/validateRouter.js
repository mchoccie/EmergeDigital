const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

/**
 * This route manages cookie jwt validation for the frontend
 */
router.get("/", auth, async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "secretKey");
  const user = await User.findOne({ _id: decoded._id, token });
  res
    .status(201)
    .json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      valid: true,
      userType: user.userType,
    });
});

module.exports = router;
