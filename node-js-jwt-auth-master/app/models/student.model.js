const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        learnYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Student;
};
