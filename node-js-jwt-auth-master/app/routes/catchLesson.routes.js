const { authJwt } = require("../middleware");
const controller = require("../controllers/catchLesson.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/catchLesson/create", [authJwt.verifyToken, authJwt.isStudent], controller.create);
    app.get("/api/catchLesson/getAllByTeacher", [authJwt.verifyToken], controller.getAllByTeacher);
    app.get("/api/catchLesson/getAllByStudent", [authJwt.verifyToken, authJwt.isStudent], controller.getAllByStudent);
    // app.get("/api/holiday/findById", [authJwt.verifyToken, authJwt.isTeacher], controller.findById);
    app.get("/api/catchLesson/delete", [authJwt.verifyToken], controller.delete);

    app.put(
        "/api/catchLesson/update",
        [authJwt.verifyToken],
        controller.update
    );
};
