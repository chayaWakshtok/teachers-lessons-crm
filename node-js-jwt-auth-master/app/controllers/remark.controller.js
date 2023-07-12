const db = require("../models");
const config = require("../config/auth.config");
const Remark = db.remark;
const Op = db.Sequelize.Op;

exports.getAllByLessen= (req, res) => {
    var id = req.query.id;

    Remark.findAll({
        include: [
            {
                model: db.student,
                as: "student",
                include: [{ model: db.user, as: "user" }]
            },
            {
                model: db.catchLesson,
                as: "catchLesson",
                include: [{ model: db.lesson, as: "lesson" }]
            }
        ],
        where: {
            'catchLesson.lesson.id': id
        },

    })
        .then(lessons => {
            res.send(lessons);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.create = (req, res) => {

    var data = req.body;

    Remark.create(data)
        .then(user => {
            res.send({ message: "Remark add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};




exports.delete = async (req, res) => {
    // Save User to Database
    var id = req.query.id;

    const message = await db.message.findByPk(id);

    message.destroy().then(p => {

        res.send({ message: "Message delete successfully!" });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};

