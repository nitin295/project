var express = require("express");
var routes = express.Router();

routes.use("/", require("../controller/home"));
routes.use("/login", require("../controller/login"));
routes.use("/signup", require("../controller/signup"));
routes.use("/myaccount", require("../controller/myaccount"));
routes.use("/cart", require("../controller/cart"));

routes.use("/admin", require("./adminroute"));


routes.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect("/login");
    return;
});

module.exports = routes;