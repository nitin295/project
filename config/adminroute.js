var express = require("express");
var routes = express.Router();

routes.use("/", require("../controller/admin/login"));


routes.use("/dashboard", auth, require("../controller/admin/dashboard"));
routes.use("/addproduct", auth, require("../controller/admin/addproduct"));

function auth(req, res, next)
{
    if(! req.session.is_admin_logged_in)
    {
        res.redirect("/admin");
        return;
    }
    next();
}



module.exports = routes;