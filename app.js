var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/countries');
mongoose.set('debug', true);

app.get('/countries', function(req, res) {
  res.send('I work!');
})

app.get('*', function(req, res) {
  res.send('This is not the page you are looking for. <a href="/countries">Go Back </a>');
});

app.listen(3000, function() {
  console.log('Starting server on localhost:3000');
});
