var express = require("express");
var routes = express.Router();
var User = require("../models/user");
var sha1 = require("sha1");

routes.get("/", (req, res) => {
    var pagedata = { title: "Login", pagename: "login/index", message : req.flash("msg") };
    res.render("layout", pagedata);});

routes.post("/", (req, res)=>{
    var u = req.body.username;
    var p = req.body.password;
    User.find({ username : u }, function(err, result){
        if(result.length == 1) 
            var data = result[0];
            if(data.password == sha1(p))
            {
                req.session.uid = data._id;
                req.session.name = data.full_name;
                req.session.is_user_logged_in=true;
                res.redirect("/myaccount");

            }
            else
            {
                req.flash("msg", "This Password is Incorrect");
                res.redirect("/login");
            }
           /*
            {
            req.flash("msg", "This Username and Password is Incorrect");
            
            res.redirect("/login");
           }*/
    })


});

module.exports = routes;