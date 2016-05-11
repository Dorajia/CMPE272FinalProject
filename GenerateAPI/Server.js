var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./models/mongo");
var MongoHexagon = require("./models/hexagon");
var router = express.Router();
var https = require("https");
var mongoose = require("mongoose");
var geojson = require("./models/geojson");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));


mongoose.connect('mongodb://ec2-54-191-90-209.us-west-2.compute.amazonaws.com:27017/Hexagon', function(err) {
    if (err) {
        console.log('connection error', err);
    }
    else {
        console.log('connection successful');
    }
});

router.get("/map",function(req,res){
    res.render('map');    
});

router.get("/hexagon", function(req, res) {
    var allpoint = [];
    MongoHexagon.find({
            id: "3"
        })
        .exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            else {
                for (var a in data) {
                    console.log(data[a].X, data[a].Y);
                    allpoint.push([data[a].X, data[a].Y]);
                }
                res.send(allpoint);
            }
        });

});


router.get("/:id", function(req, res) {
    mongoOp.find({
        _id: req.params.id
    }, function(err, original) {
        if (err) {
            res.send({
                error: err
            });
        }
        else {
            mongoOp.find({}, function(err, data) {
                if (err) {
                    res.send({
                        "error": true,
                        "message": "Error fetching data"
                    });
                }
                else {
                    var front = '/maps/api/distancematrix/json?%20units=imperial%20&origins=';
                    var middle = '&destinations=';
                    var end = '&mode=transit%20&transit_mode=bus%20&arrival_time=1461852459&key=';
                    var key = 'AIzaSyAKyCVAw6_Euv3hZxiL629RvetTRLINdNM';
                    var origions = original[0].Y + "," + original[0].X;

                    var i = 0;
                    var myloop = function() {
                        setTimeout(function() {
                            //                                                for (var i = 0; i < 5; i++) {
                            var apipath = '';
                            if (i === data.length) {
                                res.send({
                                    success: true
                                });
                            }
                            else {
                                apipath = apipath + data[i].Y + "," + data[i].X;
                                var api = front + origions + middle + apipath + end + key;

                                var url = {
                                    host: 'maps.googleapis.com',
                                    path: api
                                };

                                var index = data[i]._id;

                                var generateGeoJson = function(log) {
                                    var allpoint = [];
                                    MongoHexagon.find({
                                        id: log.index
                                    })
                                    .sort("_id")
                                    .exec(function(err, destination) {
                                        if (err) {
                                            res.send(err);
                                        }
                                        else {
                                            for (var a = 0; a < destination.length + 1; a++) {
                                                if (a < destination.length) {
                                                    allpoint.push([destination[a].X, destination[a].Y]);
                                                }
                                                else if (a === destination.length) {
                                                    var jsondoc = new geojson({
                                                        type: 'Feature',
                                                        geometry: {
                                                            type: 'Polygon',
                                                            coordinates: [allpoint]
                                                        },
                                                        properties: {
                                                            Index: log.index,
                                                            From: req.params.id,
                                                            Time: log.time
                                                        }
                                                    });

                                                    jsondoc.save(function(err) {
                                                        if (err) {
                                                            console.log(err);
                                                        }
                                                        else {
                                                            console.log("done");
                                                        }
                                                    });
                                                }

                                            }


                                        }
                                    });

                                }

                                var get_time = function(index, callback) {
                                    return https.get(url, function(response) {
                                        var result = '';
                                        response.on('error', function(err) {
                                            console.log(err);
                                        });

                                        response.on('data', function(data) {
                                            result += data;
                                        });

                                        response.on('end', function() {
                                            var parsed = JSON.parse(result);
                                            if (parsed.rows.length === 0) {
                                                res.send(parsed);
                                            }
                                            else {
                                                var log = {};
                                                var timeArray = parsed.rows[0].elements[0].duration.text.split(" ");
                                                var time = timeArray[0];
                                                log.time = time;
                                                log.index = index;
                                                callback(log);
                                            }
                                        });
                                    })
                                }
                                get_time(index, generateGeoJson);

                            }
                            i++;
                            if (i < data.length+1) { //  if the counter < 10, call the loop function
                                myloop(); //  ..  again which will trigger another 
                            }

                            //                   }

                        }, 50);
                    }
                myloop();
                }
            });

        }
    });
});


app.use('/', router);

app.listen(8080);
console.log("Listening to PORT 8080");
