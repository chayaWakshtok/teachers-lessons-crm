module.exports = (sequelize, Sequelize) => {
    const Specialty = sequelize.define("specialties", {
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

    return Specialty;
};
