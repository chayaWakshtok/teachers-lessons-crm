const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Holiday = sequelize.define("holiday", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        toDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fromHour: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        tillHour: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        allDay: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    return Holiday;
};
