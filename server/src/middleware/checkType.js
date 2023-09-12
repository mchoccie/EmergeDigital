const checkLeader = (req, res, next) => {
  if (res.locals.caller.userType !== "leader") {
    return res.status(401).json("Invalid user type");
  }
  next();
};

const checkCoach = (req, res, next) => {
  if (res.locals.caller.userType !== "coach") {
    return res.status(401).json("Invalid user type");
  }
  next();
};

const checkAdmin = (req, res, next) => {
  if (res.locals.caller.userType !== "admin") {
    return res.status(401).json("Invalid user type");
  }
  next();
};

module.exports = { checkLeader, checkCoach, checkAdmin };
