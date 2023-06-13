const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const CatchLesson = sequelize.define("catchLesson", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateFrom: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateTo: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    return CatchLesson;
};
