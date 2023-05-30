const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    return Message;
};
