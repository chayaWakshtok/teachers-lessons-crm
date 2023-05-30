const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Series = sequelize.define("series", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fromAge:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        toAge:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    return Series;
};
