const db = require("../models");
const config = require("../config/auth.config");
const Lesson = db.lesson;
const Op = db.Sequelize.Op;

exports.getAllByTeacher = (req, res) => {
    var id = req.query.id;

    Lesson.findAll({
        include: [
            {
                model: db.specialty,
                attributes: ["name", "id"],
                as: "specialty",
            },
            {
                model: db.series,
                attributes: ["name", "id"],
                as: "series",
            },
            {
                model: db.subject,
                attributes: ["name", "id"],
                as: "subject",
            },
        ],
        where: {
            teacherId: id
        },

    })
        .then(lessons => {
            res.send(lessons);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.findById = (req, res) => {
    var id = req.query.id;

    Lesson.findByPk(id, {
        include: [
            {
                model: db.specialty,
                attributes: ["name", "id"],
                as: "specialty",
            },
            {
                model: db.series,
                attributes: ["name", "id"],
                as: "series",
            },
            {
                model: db.subject,
                attributes: ["name", "id"],
                as: "subject",
            },
        ]
    })
        .then(lesson => {
            res.send(lesson);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = (req, res) => {

    var data = req.body;

    Lesson.create(data)
        .then(user => {
            res.send({ message: "Lesson add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.body.id;

    const lesson = await db.lesson.findByPk(id);
    Object.assign(lesson, data);

    lesson.save(lesson)
        .then(user => {
            res.send({ message: "Lesson update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

