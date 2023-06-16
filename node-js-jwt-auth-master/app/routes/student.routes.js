const { authJwt } = require("../middleware");
const controller = require("../controllers/student.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/student/create", controller.create);

    app.put(
        "/api/student/update",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.update
    );
};
