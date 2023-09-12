const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 *
 * @param {Object} req - http request data
 * @param {Object} res - http response data
 * @param {Function} next - middleware to execute next middleware
 * @param {String} checkType - Optional: Used to restrict to leader / coach only
 */
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("no token found");
      throw new Error("No token found!");
    }

    const decoded = jwt.verify(token, "secretKey");
    const user = await User.findOne({ _id: decoded._id, token });

    if (!user) {
      console.log("no matching user found");
      throw new Error("No matching user found!");
    }

    // Set found user in local
    res.locals.caller = user;
    res.locals.decoded = decoded;
    res.locals._id = decoded._id;
    res.locals.token = token;

    next();
  } catch (e) {
    res.clearCookie("token");
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
