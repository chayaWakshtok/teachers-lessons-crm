module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subjects", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Subject;
};
