var https = require('https');

var x = 37.756746;
var y = -122.537572;

var url2 = {
        host: 'cmpe272-extra-dora-jia-1.c9users.io',
        path :'/data/'+x+"/"+y
    };


var get_api = function(callback){
https.get(url2, function(res){
  var result = '';
  res.on('error', function(err){
  	console.log(err);
  });

  res.on('data', function (data) {
    result+=data;
  });

  res.on('end', function () {
    var parsed = JSON.parse(result);
    callback(parsed);
  });
});

}

var store_pai = function(parsed){
        for (var k in parsed.fullpath){
            var url = {
            host: 'maps.googleapis.com',
            path : parsed.fullpath[k].api};
            
            var destipointLat=parsed.fullpath[k].latitude;
            var destipointLog=parsed.fullpath[k].logitude;
           
            var get_time = function(lat,logi,callback){
                return https.get(url,function(response) {
                    var result = '';
                    response.on('error', function(err){
                      console.log(err);
                    });
                    
                    response.on('data', function (data) {
                      result+=data;
                    });
                    
                    response.on('end', function () {
                      var parsed = JSON.parse(result);
                      console.log(parsed);
                        var log = {};
                        var time = parsed.rows[0].elements[0].duration.text;
                        log.time=time;
                        log.lat=lat;
                        log.logi=logi;
                        callback(log);
                      });
                    })
            }
            
         var generateGeoJson = function(log){
            var GeoJson = []; 
            GeoJson.push({type: 'Feature',geometry:{type: 'points',coordinates:[log.logi,log.lat]},properties:{name:log.time}});
            console.log(JSON.stringify(GeoJson[0], null, "    "));  
        }
        get_time(destipointLat,destipointLog,generateGeoJson);
    }
         
}

get_api(store_pai);