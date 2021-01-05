var express = require("express");
var routes = express.Router();



routes.get("/", (req, res) => {
    var pagedata = { title: "Admin Dashboard", pagename: "admin/dashboard" };
    res.render("adminlayout", pagedata);
});


module.exports = routes;