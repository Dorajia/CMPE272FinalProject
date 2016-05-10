/**
 * http://usejsdoc.org/
 */
var mongoose    =   require("mongoose");
var geojson = require("./models/geojson");
var mongoOp = require("./models/mongo");
var MongoHexagon = require("./models/hexagon");

var db = mongoose.connection;
function onErr(err,callback) {  
	  mongoose.connection.close();
	  callback(err);
	}
	
exports.fetchgeojson = function(from, callback) {  
  db.once('open', function() {

	  console.log("database opened start point: " + from);
    geojson.find({
		"properties.From": from }
		, function(err, maps) {
      if (err) {
        onErr(err, callback);
      } else {
        mongoose.connection.close();
        console.log("success: done");
		return geojson
      }
    }); // end Team.find 
  }); // end db.once open 
};
