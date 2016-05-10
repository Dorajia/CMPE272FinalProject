var mongoose    =   require("mongoose");
//mongoose.connect('mongodb://ec2-54-191-90-209.us-west-2.compute.amazonaws.com:27017/Hexagon');

var Schema = mongoose.Schema;
var hexagonGeometrySchema = new Schema({
    id: {type:Number,ref: "coordinates"},
    X: Number,
    Y: Number
});

// Mongoose Model definition

module.exports= mongoose.model('hexagonGeometry', hexagonGeometrySchema, 'hexagonGeometry');
