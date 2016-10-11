<<<<<<< HEAD
const mongoose  = require('mongoose');
const path      = require('path');
const request   = require('request');

const Missive   = require('./db-schemas/missive.js');

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
=======
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var Missive = require('./db-schemas/missive')

mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/worst'
mongoose.connect(mongoURI);

var db = mongoose.connection;
>>>>>>> 7da83af98a7227ffbff9d18fc44f25216e94bbda
db.on('error', console.error.bind(console, 'Mongoose did wet the bed.'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

db.savePost = function(req, res) {
  const newMissive = new Missive({
    share: req.body.scope
  });

  newMissive.save(function(err, newEntry) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(newEntry);
    }
  });
};

db.retrievePosts = function(req, res) {
  Missive.find({}).exec(function(err, missives) {
    if (err) { console.error(err) }
    res.status(200).send(missives);
  })
};

module.exports = db;