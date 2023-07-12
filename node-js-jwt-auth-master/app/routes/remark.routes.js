const { authJwt } = require("../middleware");
const controller = require("../controllers/remark.controller");
const upload = require("../middleware/upload");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/message/create", [authJwt.verifyToken], controller.create);
    app.get("/api/message/getAllByLesson", [authJwt.verifyToken], controller.getAllByLessen);

};
