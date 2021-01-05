var database = require("../config/database");

module.exports.insert = function(obj, cb){
    database(function(err, con){
        var db = con.db("project6");
        db.collection("user").insert(obj, cb);
    });
}

module.exports.find = function (where, cb) {
    database(function (err, con) {
        var db = con.db("project6");
        db.collection("user").find(where).toArray(cb);
       
    });
}
module.exports.update = function (where, obj, cb) {
    database(function (err, con) {
        var db = con.db("project6");
        db.collection("user").update(where, {$set: obj}, cb);
    });
}
module.exports.delete = function (where, cb) {
    database(function (err, con) {
        var db = con.db("project6");
        db.collection("user").remove(where, cb);
    });
}