var mongoose = require('mongoose');
var path = require('path');
var request = require('request');

mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/worst'
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose did wet the bed.'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

// Calls to be moved

db.savePost = function(req, res) {
  console.log(req)
  var newMissive = new Missive({
    share: req.body.scope
  });

  newMissive.save(function(err, newEntry) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, newEntry);
    }
  });
}

db.retrievePosts = function(req, res) {
  Missive.find({}).exec(function(err, missives) {
    if (err) { console.error(err) }
    res.send(200, missives);
  })
};

module.exports = db;