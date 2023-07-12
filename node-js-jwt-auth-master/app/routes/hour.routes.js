const { authJwt } = require("../middleware");
const controller = require("../controllers/hour.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/hour/create", [authJwt.verifyToken, authJwt.isTeacher], controller.create);
    app.get("/api/hour/getAllByTeacher", [authJwt.verifyToken], controller.getAllByTeacher);
    app.get("/api/hour/findById", [authJwt.verifyToken, authJwt.isTeacher], controller.findById);
    app.get("/api/hour/delete", [authJwt.verifyToken, authJwt.isTeacher], controller.delete);

    app.put(
        "/api/hour/update",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.update
    );
};
