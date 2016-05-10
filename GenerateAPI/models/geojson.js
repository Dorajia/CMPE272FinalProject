var mongoose    =   require("mongoose");
//mongoose.connect('mongodb://ec2-54-191-90-209.us-west-2.compute.amazonaws.com:27017/Hexagon');

var Schema = mongoose.Schema;
var GeoJsonSchema = new Schema({
    type:{type:String, default:"Feature"},
    geometry:{type:{type:String,default:"Polygon"},coordinates:[]},
    properties: {Index:Number,From:Number,Time:Number}
   // Schema.Types.Mixed
}, { versionKey: false });

// Mongoose Model definition

module.exports= mongoose.model('GeoJson', GeoJsonSchema, 'GeoJson');
