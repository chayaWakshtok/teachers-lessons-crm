const db = require("../models");
const config = require("../config/auth.config");
const Specialty = db.specialty;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {

    Specialty.findAll({
        include: [
            {
                model: db.subject,
                as: "subject",
            },
        ],
    })
        .then(s => {
            res.send(s);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};