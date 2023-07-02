const { authJwt } = require("../middleware");
const controller = require("../controllers/lesson.controller");
const upload = require("../middleware/upload");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/lesson/create", [upload.single("file"), authJwt.verifyToken, authJwt.isTeacher], controller.create);
    app.get("/api/lesson/getAllByTeacher", [authJwt.verifyToken, authJwt.isTeacher], controller.getAllByTeacher);
    app.get("/api/lesson/getAll", [authJwt.verifyToken, authJwt.isStudent], controller.getAll);
    app.get("/api/lesson/findById", [authJwt.verifyToken], controller.findById);
    app.get("/api/lesson/delete", [authJwt.verifyToken, authJwt.isTeacher], controller.delete);


    app.put(
        "/api/lesson/update",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.update
    );
};
