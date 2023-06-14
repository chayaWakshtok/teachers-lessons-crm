const db = require("../models");
const config = require("../config/auth.config");
const Message = db.message;
const Op = db.Sequelize.Op;

exports.getAllByTeacher = (req, res) => {
    var id = req.query.id;

    Message.findAll({
        include: [
            {
                model: db.user,
                as: "fromUser",
            },
            {
                model: db.user,
                as: "toUser",
            }
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

exports.delete = async (req, res) => {
    // Save User to Database
    var id = req.query.id;

    const lesson = await db.lesson.findByPk(id);

    lesson.destroy().then(p => {

        res.send({ message: "Lesson delete successfully!" });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};

