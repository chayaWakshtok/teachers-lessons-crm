const db = require("../models");
const config = require("../config/auth.config");
const Hour = db.hour;
const Op = db.Sequelize.Op;

exports.getAllByTeacher = (req, res) => {
    var id = req.query.id;

    Hour.findAll({
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

    Hour.findByPk(id)
        .then(h => {
            res.send(h);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = (req, res) => {

    var data = req.body;

    Hour.create(data)
        .then(user => {
            res.send({ message: "Hour add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.body.id;

    const hour = await db.hour.findByPk(id);
    Object.assign(hour, data);

    hour.save(hour)
        .then(user => {
            res.send({ message: "Hour update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = async (req, res) => {
    // Save User to Database
    var id = req.query.id;

    const hour = await db.hour.findByPk(id);

    hour.destroy().then(p => {

        res.send({ message: "Hour delete successfully!" });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};

