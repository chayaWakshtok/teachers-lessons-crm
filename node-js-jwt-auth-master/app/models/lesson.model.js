const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define("lessons", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        durationHour: {
            type: DataTypes.DECIMAL,
            defaultValue: 1
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        picture:{
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    return Lesson;
};
