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

        // attributes: {
        //     include: [ 'id', 'name',
        //     [Sequelize.literal("(SELECT COUNT(*) from members as m where m.account_id=account.id)", "usersCount"],
        //     [Sequelize.literal("(SELECT COUNT(*) from groups as g where g.account_id=account.id)", "groupsCount"],
        //     [Sequelize.literal("(SELECT COUNT(*) from roles as r where r.account_id=account.id)", "rolesCount"],
        //     ]
        //    ,
        //     // [Sequelize.fn('count', Sequelize.col('lessons.id')), 'lessonCount'] // <---- Here you will get the total count of user
        // },
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