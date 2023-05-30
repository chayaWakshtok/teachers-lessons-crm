const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId, { include: ["role"] }).then(user => {
    if (user.role.name === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
    return;
  });
};

isStudent = (req, res, next) => {
  User.findByPk(req.userId, { include: ["role"] }).then(user => {
    if (user.role.name === "student") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require student Role!"
    });
    return;
  });
};


isTeacher = (req, res, next) => {
  User.findByPk(req.userId, { include: ["role"] }).then(user => {
    if (user.role.name === "teacher") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require teacher Role!"
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isStudent: isStudent,
  isTeacher: isTeacher
};
module.exports = authJwt;
