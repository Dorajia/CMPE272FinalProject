//host a server for map.html retrieve data base on index

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
 
	res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Request-Headers", "*");
	var index = req.query.index;// passing index as parameter
	console.log(index);
     geojson.find({
		"properties.From": index },'-_id properties geometry type'
		, function(err, maps) {
      if (err) {
        res.send(err);
      } else {
        console.log("success: done"+maps[1]);
		//console.log("success: done"+maps[2]);
		res.json(maps);
		//res.send("var geo = " +JSON.stringify(maps));
      }
    });
	
});


app.listen(8080);
console.log("Listening to PORT 8080");





