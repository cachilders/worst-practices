                      require('dotenv').config();
const express       = require('express');
const favicon       = require('serve-favicon');
const path          = require('path');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const emoji         = require("emojilib");
const backpat       = require('backpat').backpat;

const app = express();

const port = process.env.PORT||3000;

app.listen(port);

app.use(express.static(__dirname + "/client"));
app.use(favicon(path.join(__dirname,'client','images','favicon.ico')));

app.use(bodyParser.json());

app.get('/', (req, res) => res.redirect('/index.html'))
app.get('/emoji', (req, res) => res.send(emoji));

console.log('Server now listening on port ' + port);

module.exports = app;
