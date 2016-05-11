var mongoose    =   require("mongoose");
//mongoose.connect('mongodb://ec2-54-191-90-209.us-west-2.compute.amazonaws.com:27017/Hexagon');

var Schema = mongoose.Schema;
var allpointsSchema = new Schema({
    type:String,
    geometry:{},
    properties: {Index:Number}
   // Schema.Types.Mixed
});

// Mongoose Model definition

module.exports= mongoose.model('allpoints', allpointsSchema, 'allpoints');
