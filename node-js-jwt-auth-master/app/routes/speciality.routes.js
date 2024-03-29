const { authJwt } = require("../middleware");
const controller = require("../controllers/spciality.controler");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/speciality/getAll", [], controller.getAll);
    app.post("/api/speciality/create", [authJwt.verifyToken, authJwt.isTeacher], controller.create);
};
