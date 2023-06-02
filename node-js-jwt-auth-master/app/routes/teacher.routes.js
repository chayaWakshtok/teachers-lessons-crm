const { authJwt } = require("../middleware");
const controller = require("../controllers/teacher.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/teacher/create", controller.create);

  app.put(
    "/api/teacher/update",
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.update
  );
};
