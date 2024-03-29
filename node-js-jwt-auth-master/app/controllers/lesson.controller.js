const db = require("../models");
const config = require("../config/auth.config");
const Lesson = db.lesson;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");

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
}


exports.getAll = (req, res) => {

    Lesson.findAll({
        include: [
            {
                model: db.specialty,
                attributes: ["name", "id"],
                as: "specialty",
            },
            {
                model: db.teacher,
                as: "teacher",
                include: [{ model: db.user, as: "user" }, { model: db.hour, as: "hours" }]
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
            {
                model: db.catchLesson,
                as: "catchLessons",
                include: [{ model: db.remark, as: "remarks" }]
            },
        ],
        order: [
            ['updatedAt', 'DESC'],
        ],
    })
        .then(lessons => {

            lessons.forEach(lesson => {
                var sum = 0;
                var total = 0;
                lesson.catchLessons.forEach(catchLesson => {
                    catchLesson.remarks.forEach(remark => {
                        sum += remark.stars;
                        total++;
                    });
                });
                if (total > 0)
                    lesson.setDataValue('stars', sum / total);
                else
                    lesson.setDataValue('stars', 0);
                lesson.setDataValue('sumRemark', total);
            });
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
            {
                model: db.teacher,
                include: [{ model: db.user, as: "user" }],
                as: "teacher",
            },
            {
                model: db.catchLesson,
                as: "catchLessons",
                include: [{
                    model: db.remark, as: "remarks",
                    include: [{ model: db.student, as: "student", include: [{ model: db.user, as: "user" }] }]
                }]
            },
        ]
    })
        .then(lesson => {
            var sum = 0;
            var total = 0;
            lesson.catchLessons.forEach(catchLesson => {
                catchLesson.remarks.forEach(remark => {
                    sum += remark.stars;
                    total++;
                });
            });
            if (total > 0)
                lesson.setDataValue('stars', sum / total);
            else
                lesson.setDataValue('stars', 0);
            lesson.setDataValue('sumRemark', total);
            res.send(lesson);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = (req, res) => {

    var data = req.body;

    if (req.file) {
        data.picture = req.file.filename;
    }

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

