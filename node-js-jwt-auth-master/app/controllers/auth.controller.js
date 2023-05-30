const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  var data = req.body;
  data.password = bcrypt.hashSync(req.body.password, 8);

  User.create(data)
    .then(user => {
      res.send({ message: "User registered successfully!", data: user.id });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    include: ["teacher", "student"],
    where: {
      username: req.body.username
    },

  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        accessToken: token,
        teacher: user.teacher,
        student: user.student
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
