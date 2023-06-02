const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.subject = require("../models/subject.model.js")(sequelize, Sequelize);
db.specialty = require("../models/specialty.model.js")(sequelize, Sequelize);
db.city = require("../models/city.model.js")(sequelize, Sequelize);
db.teacher = require("../models/teacher.model.js")(sequelize, Sequelize);
db.student = require("../models/student.model.js")(sequelize, Sequelize);
db.catchLesson = require("../models/catchLesson.model.js")(sequelize, Sequelize);
db.holiday = require("../models/holiday.model.js")(sequelize, Sequelize);
db.hour = require("../models/hour.model.js")(sequelize, Sequelize);
db.lesson = require("../models/lesson.model.js")(sequelize, Sequelize);
db.message = require('../models/message.model.js')(sequelize, Sequelize);
db.remark = require("../models/remark.model.js")(sequelize, Sequelize);
db.series = require("../models/series.model.js")(sequelize, Sequelize);



db.teacher.hasMany(db.catchLesson, { as: "catchLessons" });
db.catchLesson.belongsTo(db.teacher, {
  foreignKey: "teacherId",
  as: "teacher",
});

db.student.hasMany(db.catchLesson, { as: "catchLessons" });
db.catchLesson.belongsTo(db.student, {
  foreignKey: "studentId",
  as: "student",
});

db.lesson.hasMany(db.catchLesson, { as: "catchLessons" });
db.catchLesson.belongsTo(db.lesson, {
  foreignKey: "lessonId",
  as: "lesson",
});

db.teacher.hasMany(db.holiday, { as: "holidays" });
db.holiday.belongsTo(db.teacher, {
  foreignKey: "teacherId",
  as: "teacher",
});


db.teacher.hasMany(db.lesson, { as: "lessons" });
db.lesson.belongsTo(db.teacher, {
  foreignKey: "teacherId",
  as: "teacher",
});

db.specialty.hasMany(db.lesson, { as: "lessons" });
db.lesson.belongsTo(db.specialty, {
  foreignKey: "specialtyId",
  as: "specialty",
});

db.subject.hasMany(db.lesson, { as: "lessons" });
db.lesson.belongsTo(db.subject, {
  foreignKey: "subjectId",
  as: "subject",
});

db.series.hasMany(db.lesson, { as: "lessons" });
db.lesson.belongsTo(db.series, {
  foreignKey: "seriesId",
  as: "series",
});

db.specialty.hasMany(db.series, { as: "series" });
db.series.belongsTo(db.specialty, {
  foreignKey: "specialtyId",
  as: "specialty",
});


db.user.hasMany(db.message, { as: "messagesFrom" });
db.message.belongsTo(db.user, {
  foreignKey: "fromUserId",
  as: "fromUser",
});

db.user.hasMany(db.message, { as: "messagesTo" });
db.message.belongsTo(db.user, {
  foreignKey: "toUserId",
  as: "user",
});

db.catchLesson.hasMany(db.remark, { as: "remarks" });
db.remark.belongsTo(db.catchLesson, {
  foreignKey: "catchLessonId",
  as: "catchLesson",
});

db.student.hasMany(db.remark, { as: "remarks" });
db.remark.belongsTo(db.student, {
  foreignKey: "studentId",
  as: "student",
});

db.teacher.hasMany(db.hour, { as: "hours" });
db.hour.belongsTo(db.teacher, {
  foreignKey: "teacherId",
  as: "teacher",
});

db.teacher.hasMany(db.series, { as: "series" });
db.series.belongsTo(db.teacher, {
  foreignKey: "teacherId",
  as: "teacher",
});0

db.user.hasOne(db.teacher);
db.teacher.belongsTo(db.user);

db.user.hasOne(db.student);
db.student.belongsTo(db.user);

db.subject.hasMany(db.specialty, { as: "specialties" });
db.specialty.belongsTo(db.subject, {
  foreignKey: "subjectId",
  as: "subject",
});

db.city.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.city, {
  foreignKey: "cityId",
  as: "city",
});

db.role.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role",
});






// db.city.hasMany(db.user, { as: "users" });
// db.user.belongsTo(db.city, {
//   foreignKey: "cityId",
//   as: "city",
// });

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

db.ROLES = ["student", "teacher", "admin"];

module.exports = db;
