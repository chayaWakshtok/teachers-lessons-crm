const db = require("../models");
const config = require("../config/auth.config");
const Series = db.series;
const Op = db.Sequelize.Op;

exports.getAllByTeacher = (req, res) => {
    var id = req.query.id;

    Series.findAll({
        include: [
            {
                model: db.specialty,
                as: "specialty",
            },
        ],
        where: {
            teacherId: id
        }
    })
        .then(s => {
            res.send(s);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.create = (req, res) => {

    var data = req.body;

    Series.create(data)
        .then(user => {
            res.send({ message: "Series add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.params.id;

    const series = await db.series.findByPk(id);
    Object.assign(series, data);

    Series.save(series)
        .then(user => {
            res.send({ message: "Series update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findById = (req, res) => {
    var id = req.query.id;

    Series.findByPk(id, {
        include: [
            {
                model: db.specialty,
                as: "specialty",
            }
        ]
    })
        .then(lesson => {
            res.send(lesson);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.delete = async (req, res) => {
    // Save User to Database
    var id = req.query.id;

    const ser = await db.series.findByPk(id);

    ser.destroy().then(p => {

        res.send({ message: "Series delete successfully!" });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};
