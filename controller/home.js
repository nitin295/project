var express = require("express");
var routes = express.Router();

var Product = require("../models/product");

routes.get("/", (req, res) => {

    Product.find({}, function(err, result){
        var pagedata = { title: "Home", pagename: "home/index", result : result};
        res.render("layout", pagedata);
    });



});

module.exports = routes;