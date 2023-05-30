const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teachers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        sameGender:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Teacher;
};
