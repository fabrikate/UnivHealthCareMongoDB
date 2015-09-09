var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/countries');
mongoose.set('debug', true);

var Country = new mongoose.Schema({
  name: String,
  flag: String,
  capital: String,
  population: Number
});

var countries = mongoose.model('countries', Country);

app.get('/countries', function(req, res) {
  countries.find({}, function(err, data) {
    countriesObj = data
    res.render('index', {countries: countriesObj});
  })
})

app.get('/countries/new', function(req, res) {
  res.render('new');
});

app.get('/countries/:id/edit', function(req, res) {
  res.render('edit');
});

app.get('/countries/:id/edit', function(req, res) {
  countries.findByIdAndUpdate(req.params.id, req.body.country, function(err, country) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/countries', {countries: countriesObj});
    }
  })
})

app.post('/countries', function(req, res) {
  console.log(req.body.country);
  countries.create(req.body.country, function(err, country) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/countries');
    }
  })
});

app.delete('/countries/:id', function(req, res) {
  countries.findByIdAndRemove(req.params.id, function(err, data) {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/countries');
    }
  });
});

app.get('*', function(req, res) {
  res.send('This is not the page you are looking for. <a href="/countries">Go Back </a>');
});

app.listen(3000, function() {
  console.log('Starting server on localhost:3000');
});
