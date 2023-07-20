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

exports.create = (req, res) => {

    Specialty.findOne({
        where: {
            name: req.body.name
        }
    }).then(result => {
        if (result) {
            res.status(500).send({
                message: "Failed! Specialty is already exits!"
            });
            return;
        }
        else {
            var data = req.body;

            Specialty.create(data)
                .then(user => {
                    res.send({ message: "Specialty add successfully!" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        }
    });
};