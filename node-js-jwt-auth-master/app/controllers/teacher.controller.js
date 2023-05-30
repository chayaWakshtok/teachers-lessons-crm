const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Teacher = db.teacher;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Save User to Database
    var data = req.body;

    Teacher.create(data)
        .then(user => {
            res.send({ message: "Teacher registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.params.id;

    const teacher = await db.teacher.findByPk(id);
    Object.assign(teacher, data);

    teacher.save(data)
        .then(user => {
            res.send({ message: "Teacher update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.teacherSpecialties = async (req, res) => {

    var id = req.query.id;

    const teacher = await db.teacher.findByPk(id,{
        include: [
          {
            model: db.specialty,
            attributes: ["name","id"],
            as: "specialties",
          },
        ],
      });
    res.send({ data: teacher });

};