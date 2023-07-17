const db = require("../models");
const config = require("../config/auth.config");
const CatchLesson = db.catchLesson;
const Op = db.Sequelize.Op;
const email = require("./email/email");


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
                include: [{ model: db.user, as: "user" }]
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

exports.getAllByStudent = (req, res) => {
    var id = req.query.id;

    CatchLesson.findAll({
        where: {
            studentId: id
        },
        include: [
            {
                model: db.teacher,
                as: "teacher",
                include: [{ model: db.user, as: "user" }]
            },
            {
                model: db.lesson,
                // attributes: ["name", "id"],
                as: "lesson",
            },
            {
                model: db.remark,
                // attributes: ["name", "id"],
                as: "remarks",
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

exports.create = (req, res) => {

    var data = req.body;

    CatchLesson.create(data)
        .then(user => {
            res.send({ message: "Catch Lesson add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.body.id;

    const catchL = await db.catchLesson.findByPk(id);
    Object.assign(catchL, data);

    catchL.save(catchL)
        .then(user => {
            res.send({ message: "Catch Lesson update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = async (req, res) => {
    // Save User to Database
    var id = req.query.id;

    const catchL = await db.catchLesson.findByPk(id,{
        include: [
            {
                model: db.student,
                as: "student",
                include: [{ model: db.user, as: "user" }]
            },
            {
                model: db.lesson,
                // attributes: ["name", "id"],
                as: "lesson",
            },
            {
                model: db.teacher,
                as: "teacher",
                include: [{ model: db.user, as: "user" }]
            },
        ],
    }
);

    catchL.destroy().then(p => {
        email.sendEmail(catchL.student.user.email, catchL.teacher.user.email, "Catch Lesson Delete", "Your catch lesson has been deleted!");
        res.send({ message: "Catch Lesson delete successfully!" });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};