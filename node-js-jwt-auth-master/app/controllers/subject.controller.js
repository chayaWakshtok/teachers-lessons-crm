const db = require("../models");
const config = require("../config/auth.config");
const Subject = db.subject;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {

    Subject.findAll({
        include: [
            {
                model: db.specialty,
                attributes: ["name", "id"],
                as: "specialties",
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