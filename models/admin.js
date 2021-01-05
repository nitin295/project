var database = require("../config/database");

module.exports.find = function(where, cb){
    database(function(err, con){
        var db = con.db("project6");
        db.collection("admin").find(where).toArray(cb);
    });
}