var database = require("../config/database");

module.exports.find = function(where, cb){
    database(function(err, con){
        var db = con.db("project6");
        db.collection("product").find(where).toArray(cb);
    });
}

module.exports.insert = function (obj, cb) {
    database(function (err, con) {
        var db = con.db("project6");
        db.collection("product").insert(obj, cb);
    });
}

module.exports.delete = function (where, cb) {
    database(function (err, con) {
        var db = con.db("project6");
        db.collection("product").remove(where, cb);
    });
}
module.exports.update = function (where, obj, cb) {
    database(function (err, con) {
        var db = con.db("project6");
        db.collection("product").udpate(where, { $set : obj}, cb);
    });
}

