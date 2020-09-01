var mongoose              = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');

// Movie Schema
var movieSchema = mongoose.Schema({
   _id: {
     type: Number,
     index:true 
  },
  movieName: {
    type: String,
  },
  rating: [{
    type: Number,
    min: 1,
    max: 5,
    require: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not a whole number' 
    }
  }],
  review: [{
    type: String
  }],
  reviewer: [{
    type: String
  }],
  date: [{
    type: String
  }]
});

// movieSchema.plugin(passportLocalMongoose);
var Movie = module.exports = mongoose.model('Movie', movieSchema);
module.exports = Movie;
