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


// returns the data from database
var map_data = fetchdata.fetchgeojson(0);
 console.log("Done reading get data");
 
app.use('/',router.get('/', function(req, res, next) {
	console.log("home?");
  res.write('No such home page check /map');
})
);


var fs = require('fs');
router.get('/map',function (req,res){
	console.log("map?");
	 fs.readFile('map_template.html','utf8',function (err, data){
		console.log("start update map?"+typeof JSON.stringify(map_data));
		data.replace(/\{geo_data_from_DB\}/g, /* JSON.stringify(map_data) */"test");
		console.log("Done update map?");
		console.log(data);
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
	});


app.listen(8848);
console.log("Listening to PORT 8848");


