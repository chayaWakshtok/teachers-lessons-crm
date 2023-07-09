const { authJwt } = require("../middleware");
const controller = require("../controllers/message.controller");
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
    app.get("/api/message/getAllByFrom", [authJwt.verifyToken], controller.getAllFrom);
    app.get("/api/message/getAllByTo", [authJwt.verifyToken], controller.getAllTo);
    app.get("/api/message/updateRead", [authJwt.verifyToken], controller.updateAllReadByTo);
    app.get("/api/message/delete", [authJwt.verifyToken], controller.delete);



    app.put(
        "/api/message/update",
        [authJwt.verifyToken],
        controller.update
    );
};
