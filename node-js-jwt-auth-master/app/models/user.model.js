const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.STRING, allowNull: false, validate: { len: [2, 50] }
    },
    email: {
      type: DataTypes.STRING, allowNull: false, validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING, allowNull: false
    },
    tz: {
      type: DataTypes.STRING(9), allowNull: false, validate: { len: [8, 9] }
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.INTEGER, allowNull: false, isIn: [[1, 2]] },
    bornDate: { type: DataTypes.DATE, allowNull: false, validate: { isAfter: "1900-01-05" } },
    phone: { type: DataTypes.STRING(11), allowNull: false, validate: { len: [7, 12] } },
    telphone: { type: DataTypes.STRING(11), allowNull: true, validate: { len: [7, 12] } },
    street: { type: DataTypes.STRING, allowNull: true },
    age: {
      type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['bornDate']),
      get() {
        var diff_ms = Date.now() - this.get('bornDate');
        var age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
      }
    },
    picture:{
      type: DataTypes.STRING,
      allowNull: true
  },
    //role
  });

  return User;
};
