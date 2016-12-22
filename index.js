                      require('dotenv').config();
const express       = require('express');
const favicon       = require('serve-favicon');
const path          = require('path');
const partials      = require('express-partials');
const session       = require('express-session');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const passport      = require('passport');
const cookieParser  = require('cookie-parser');
const strategy      = require('./server/setup-passport');
const db            = require('./server/db-config');
const emoji         = require("emojilib");

const app = express();

const port = process.env.PORT||3000;

app.listen(port);

app.use(express.static(__dirname + "/client"));
app.use(favicon(path.join(__dirname,'client','images','favicon.ico')));

app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: process.env.AUTH0_CLIENT_SECRET, resave: false,  saveUninitialized: false }));

app.get('/', (req, res) => res.redirect('/index.html'))
app.get('/emoji', (req, res) => res.send(emoji));
app.get('/posts', db.retrievePosts);
app.post('/save', db.savePost);

app.get('/authCallback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });

app.get('/user', function (req, res) {
  res.render('user', {
    user: req.user
  });
});

console.log('Server now listening on port ' + port);

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
