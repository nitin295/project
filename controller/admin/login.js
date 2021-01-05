var express = require("express");
var routes = express.Router();
var Admin = require("../../models/admin");
var sha1 = require('sha1');


routes.get("/", (req, res) => {
    var pagedata = { title: "Admin Login", pagename: "admin/index", message : req.flash("msg") };
    res.render("adminlayout", pagedata);
});
routes.post("/", (req, res)=>{
    var u = req.body.username;
    var p = req.body.password;
    Admin.find({ username : u}, function(err, result){
        if(result.length==1)
        {
            var data = result[0];
            if(data.password == sha1(p))
            {
                req.session.adminid = data._id;
                req.session.adminname = data.username;
                req.session.is_admin_logged_in = true;
                res.redirect("/admin/dashboard");
            }
            else
            {
                req.flash("msg", "This  Password is Incorrect");
                res.redirect("/admin");
            }
        }
        else
        {
            req.flash("msg", "This Username And Password is Incorrect");
            res.redirect("/admin");
        }
    });

})

module.exports = routes;