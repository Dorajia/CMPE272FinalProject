var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var https = require("https");
var mongoose = require("mongoose");
var app = express();

//define the schema
var geojson = require("./models/geojson");
var mongoOp = require("./models/mongo");
var MongoHexagon = require("./models/hexagon");

var fetchdata = require("./fetchdata");
console.log("start?");

mongoose.connect('mongodb://ec2-54-191-90-209.us-west-2.compute.amazonaws.com:27017/Hexagon', function(err) {
    if (err) {
        console.log('connection error', err);
    }
    else {
        console.log('connection successful');
    }
});

//  set api for data
 app.get('/data', function(req, res) {
 
     geojson.find({
		"properties.From": 0 }
		, function(err, maps) {
      if (err) {
        onErr(err, callback);
      } else {
        //console.log("success: done"+maps[1]);
		//console.log("success: done"+maps[2]);
		res.json(maps);
      }
    });
	
});

app.listen(8848);
console.log("Listening to PORT 8848");


