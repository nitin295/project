var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("express-flash");
var fileupload = require("express-fileupload");



app.set("view engine", "ejs");
app.use(express.static(__dirname+"/assets"));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret : "my project name"}));
app.use(flash());
app.use(fileupload());



app.use(function(req, res, next){ 
    res.locals.a = "TSS";
    res.locals.session = req.session;
    res.locals.cart="";
    if(req.cookies.cart)
    {
        res.locals.cart = req.cookies.cart;
    }
    next();
});



app.use(require("./config/routes"));

app.listen(3000, () => {
    console.log("server running");
});