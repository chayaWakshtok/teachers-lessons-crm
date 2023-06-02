const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const CatchLesson = sequelize.define("catchLesson", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fromHour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        tillHour: {
            type: DataTypes.TIME,
            allowNull: false,
        }
    });

    return CatchLesson;
};
