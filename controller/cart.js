var express = require("express");
var routes = express.Router();

var Product = require("../models/product");
var mongo = require("mongodb");


routes.get("/", (req, res)=>{
   
    var arr = req.cookies.cart.split("#");
    
    var objectArr = [];
    arr.forEach(function(x){
       var obj = { _id : mongo.ObjectId(x) };
        objectArr.push(obj);
    });

    
    var where = { $or: objectArr };
    Product.find(where, function(err, result){
        var pagedata = {title : "Your Cart", pagename : "mycart", "result":result};
        res.render("layout", pagedata);
        });
});

routes.get("/remove/:id", (req, res)=>{
    var arr = req.cookies.cart.split("#");
    var removeid = req.params.id;
    var n = arr.indexOf(removeid);
    arr.splice(n, 1);
    var str = arr.join("#");
    res.cookie("cart", str, { expire: 360000 + Date.now() });
    res.redirect("/cart");
});


routes.get("/add/:id", (req, res) => {
    console.log(req.params);
    var id = req.params.id;
    console.log(req.cookies.cart);
    if(req.cookies.cart)
    {
        var oldid = req.cookies.cart;
        var newids = id+"#"+oldid;
        res.cookie("cart", newids, { expire : 360000+Date.now()});
    }
    else
    {
        res.cookie("cart", id, { expire : 360000+Date.now()});

    }

    res.redirect("/");
    
});

module.exports = routes;

