const db = require("../models");
const config = require("../config/auth.config");
const CatchLesson = db.catchLesson;
const Op = db.Sequelize.Op;


exports.getAllByTeacher = (req, res) => {
    var id = req.query.id;

    CatchLesson.findAll({
        where: {
            teacherId: id
        },
        include: [
            {
                model: db.student,
                // attributes: ["name", "id"],
                as: "student",
            },
            {
                model: db.lesson,
                // attributes: ["name", "id"],
                as: "lesson",
            }
        ],

    })
        .then(h => {
            res.send(h);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};