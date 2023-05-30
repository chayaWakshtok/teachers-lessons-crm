const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Hour = sequelize.define("hours", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fromHour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        tillHour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    return Hour;
};
