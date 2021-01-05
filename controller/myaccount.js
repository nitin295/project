var express = require("express");
var routes = express.Router();
var User = require("../models/user");


routes.get("/", (req, res) => {
    if(! req.session.is_user_logged_in)
    {
        res.redirect("/login");
        return;
    }


    var pagedata = { title: "My Account", pagename: "user/myaccount" };
    res.render("layout", pagedata);
});


module.exports = routes;