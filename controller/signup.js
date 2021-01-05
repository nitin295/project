var express = require("express");
var routes = express.Router();
var sha1 = require("sha1");

var User = require("../models/user");

routes.get("/", (req, res)=>{
    var pagedata = { title : "Signup", pagename : "signup/index"};
    res.render("layout", pagedata);
});

routes.post("/", (req, res)=>{
    console.log(req.body);
    req.body.password = sha1(req.body.password);

    User.insertmany(req.body, function(err, result){
        res.redirect("/login");
    });
})

module.exports = routes;