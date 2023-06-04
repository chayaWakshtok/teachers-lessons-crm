const db = require("../models");
const config = require("../config/auth.config");
const Holiday = db.holiday;
const Op = db.Sequelize.Op;

exports.getAllByTeacher = (req, res) => {
    var id = req.query.id;

    Holiday.findAll({
        where: {
            teacherId: id
        },

    })
        .then(h => {
            res.send(h);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.findById = (req, res) => {
    var id = req.query.id;

    Holiday.findByPk(id)
        .then(h => {
            res.send(h);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = (req, res) => {

    var data = req.body;

    Holiday.create(data)
        .then(user => {
            res.send({ message: "Holiday add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.body.id;

    const holiday = await db.holiday.findByPk(id);
    Object.assign(holiday, data);

    holiday.save(holiday)
        .then(user => {
            res.send({ message: "Holiday update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

