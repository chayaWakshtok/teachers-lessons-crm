const db = require("../models");
const config = require("../config/auth.config");
const City = db.city;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {
    // Save User to Database

    City.findAll()
        .then(cities => {
            res.send(cities);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};