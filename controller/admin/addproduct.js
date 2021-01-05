var express = require("express");
var routes = express.Router();
var Product = require("../../models/product");
var path = require("path");
var rand = require("randomstring");



routes.get("/", (req, res) => {
    var pagedata = { title: "Admin Add Product", pagename: "admin/addproduct", message : req.flash("msg") };
    res.render("adminlayout", pagedata);
});

routes.post("/", (req, res)=>{
    req.body.price = parseInt(req.body.price);
    req.body.discount = parseInt(req.body.discount);

    var image = req.files.image;
    


    
    var imagepath = path.resolve()+"/assets/products/";
    var name = rand.generate(20); // ac4752vsdfger524d8v52sdr782512.jpg

    var arr = image.name.split("."); // 10.hello.world.jpg
    // [10, "hello", "world", "jpg"]
    // arr.length = 4
    var ext = arr[arr.length - 1];
    var newname = name+"."+ext;

    if(ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif")
    {
        if (image.size <= 2000000) // if image size in less then 2mb
        {
            image.mv(imagepath + newname, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                req.body.image = newname;
                Product.insert(req.body, function (err, result) {
                    res.redirect("/admin/addproduct");
                });

            });
        }
        else {
            req.flash("msg", "The file size is too large");
            res.redirect("/admin/addproduct");
        }
    }
    else{
        
        req.flash("msg", "The file type should an image");
        res.redirect("/admin/addproduct");
    }

    
    

    // E:/newbatch/project/assets/products

})


module.exports = routes;