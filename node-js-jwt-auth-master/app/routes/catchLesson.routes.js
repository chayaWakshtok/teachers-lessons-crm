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

    // app.post("/api/holiday/create", [authJwt.verifyToken, authJwt.isTeacher], controller.create);
    app.get("/api/holiday/getAllByTeacher", [authJwt.verifyToken, authJwt.isTeacher], controller.getAllByTeacher);
    // app.get("/api/holiday/findById", [authJwt.verifyToken, authJwt.isTeacher], controller.findById);
    app.get("/api/holiday/delete", [authJwt.verifyToken, authJwt.isTeacher], controller.delete);

    app.put(
        "/api/holiday/update",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.update
    );
};
