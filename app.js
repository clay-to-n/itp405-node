var express = require('express');
var ejs = require('ejs');
var Dvd = require('./models/Dvd');

var app = express();
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Search'
    });
});

app.get('/dvds', function(req, res) {
    console.log(req.query.title);

    Dvd.findAll({
        where: {
            title: { like: '%' + req.query.title + '%' },
            award: { like: '%' + req.query.award + '%' }
        },
        order: 'title DESC'
    }).then(function(results) {
        res.render('dvds', {
            dvds: results
        });
    });
});

app.listen(3000, function() {
   console.log('Listening on localhost:3000');
});