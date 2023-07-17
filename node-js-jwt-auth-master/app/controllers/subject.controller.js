const db = require("../models");
const config = require("../config/auth.config");
const Subject = db.subject;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");

exports.getAll = (req, res) => {

    Subject.findAll({
        attributes: [
            'id',
            'name',
            [
                Sequelize.literal(`(
                SELECT COUNT(lessons.id)
                FROM lessons
                WHERE lessons.subjectId = subjects.id
              )`),
                'lessonsCount',
            ],
        ],

        include: [
            {
                model: db.specialty,
                attributes: [
                    'id',
                    'name',
                    [
                        Sequelize.literal(`(
                        SELECT COUNT(lessons.id)
                        FROM lessons
                        WHERE lessons.specialtyId = specialties.id
                      )`),
                        'specialtiesCount',
                    ],
                ],
                as: "specialties",
            },
            // {
            //     model: db.lesson,
            //     as: "lessons",
            // },
        ],
        // group: ['lessons.id']

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

    Subject.create(data)
        .then(user => {
            res.send({ message: "Subject add successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

