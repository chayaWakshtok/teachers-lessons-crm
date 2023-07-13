const db = require("../models");
const config = require("../config/auth.config");
const Message = db.message;
const Op = db.Sequelize.Op;

exports.getAllTo = (req, res) => {
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
            toUserId: id
        },

    })
        .then(lessons => {
            res.send(lessons);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllFrom = (req, res) => {
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
            fromUser: id
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

    Message.findByPk(id, {
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

    Message.create(data)
        .then(user => {
            res.send({ message: "Message Send successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = async (req, res) => {
    // Save User to Database
    var data = req.body;
    var id = req.body.id;

    const message = await db.message.findByPk(id);
    Object.assign(message, data);

    message.save(message)
        .then(user => {
            res.send({ message: "Message update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateAllReadByTo = async (req, res) => {
    // Save User to Database
    var id = req.query.id;

    Message.update({ isRead: true }, { where: { toUser: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Message was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Message with id=${id}. Maybe Message was not found or req.query is empty!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Message with toUser = " + id
            });
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

