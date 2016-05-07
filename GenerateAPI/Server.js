var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoOp     =   require("./models/mongo");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});
router.route("/data/:lat/:log")
    .get(function(req,res){
        mongoOp.find({},function(err,data){
            if(err) {
                res.send({"error" : true,"message" : "Error fetching data"});
            } else {
                var front = '/maps/api/distancematrix/json?%20units=imperial%20&origins=';
                var middle='&destinations=';
                var end = '&mode=transit%20&transit_mode=bus%20&arrival_time=1461852459key=';
                var key = 'AIzaSyAIE3Ly83t0yhWYQjrTWQFBX-Jq8umjfd4';
                var fullpath = [];
                var origions = req.params.lat+","+req.params.log;
                    for(var i = 0; i < data.length; i++){
                    var path = '';
                                if (data[i].X===req.params.log && data[i].Y===req.params.lat ){
                                continue;
                                }
                                if(i === data.length-1)
                                {
                                    break;
                                }
                                else{
                                path = path+data[i].Y+","+data[i].X;
                                fullpath.push({api:front+origions+middle+path+end+key,latitude:data[i].Y,logitude:data[i].X});
                                continue;
                                }
                            }
                res.send({fullpath});
            }
        });
    })

app.use('/',router);

app.listen(8080);
console.log("Listening to PORT 8080");
