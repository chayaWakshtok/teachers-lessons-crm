const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Student = db.student;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Save User to Database
    var data = req.body;

    Student.create(data)
        .then(user => {
            res.send({ message: "Student registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.params.id;

    const student = await db.student.findByPk(id);
    Object.assign(student, data);

    Student.save(student)
        .then(user => {
            res.send({ message: "Student update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
