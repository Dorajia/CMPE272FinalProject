var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./models/mongo");
var router = express.Router();
var https = require("https");
var GeoJson = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));

router.get("/", function(req, res) {
    res.json({
        "error": false,
        "message": "Hello World"
    });
});

router.route("/data/:lat/:log")
    .get(function(req, res) {
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
                var key = 'AIzaSyCjaKNHLAHUjlnAziHgrRhqE3lYrvlgGMg';
                var origions = req.params.lat + "," + req.params.log;
                for (var i = 0; i < 5; i++) {
                    var apipath = '';
                    if (data[i].X === req.params.log && data[i].Y === req.params.lat) {
                        continue;
                    }
                    if (i === 4) {
                        res.send(GeoJson);
                        GeoJson = [];
                        break;
                    }
                    else {
                        apipath = apipath + data[i].Y + "," + data[i].X;
                        var api = front + origions + middle + apipath + end + key;

                        var url = {
                            host: 'maps.googleapis.com',
                            path: api
                        };

                        var destipointLat = data[i].Y;
                        var destipointLog = data[i].X;
                        var index = data[i].id;

                        var get_time = function(lat, logi, index, callback) {
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
                                    var log = {};
                                    var time = parsed.rows[0].elements[0].duration.text;
                                    log.time = time;
                                    log.lat = lat;
                                    log.logi = logi;
                                    log.index = index;
                                    callback(log);
                                });
                            })
                        }

                        var generateGeoJson = function(log) {
                            GeoJson.push({
                                type: 'Feature',
                                geometry: {
                                    type: 'points',
                                    coordinates: [log.logi, log.lat]
                                },
                                properties: {
                                    Index: log.index,
                                    From: log.index,
                                    Time: log.time
                                }
                            });
                        }

                        get_time(destipointLat, destipointLog, index, generateGeoJson);

                        continue;

                    }

                }
            }
        });
    })

app.use('/', router);

app.listen(8080);
console.log("Listening to PORT 8080");
