// require mongoose
var mongoose = require('mongoose');
// create the schema
var PlayerSchema = new mongoose.Schema({
  name:String,
  position:String,
  game1:Number,
  game2:Number,
  game3:Number

})
// register the schema as a model
var Player = mongoose.model('Player', PlayerSchema);
