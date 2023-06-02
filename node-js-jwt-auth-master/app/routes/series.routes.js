const { authJwt } = require("../middleware");
const controller = require("../controllers/series.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/series/create", [authJwt.verifyToken, authJwt.isTeacher], controller.create);
    app.get("/api/series/getAllByTeacher", [authJwt.verifyToken, authJwt.isTeacher], controller.getAllByTeacher);

    app.put(
        "/api/series/update",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.update
    );
};
