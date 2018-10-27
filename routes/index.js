var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', { root: 'public' });

});

router.get('/getcity', function(req, res, next) {
    console.log("in getcity route");
    fs.readFile('cities.txt', function(err, data) {
        if (err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req['query']['q']); //maybe move this and next line into for loop
        var jsonresult = [];
        for (var i = 0; i < cities.length; i++) {

            var result = cities[i].search(myRe);
            if (result != -1) {
                jsonresult.push({ city: cities[i] });
            }
        }
        res.status(200).json(jsonresult);
    });

})

router.get('/getweather', function(req, res, next) {
    console.log("in getweather route");
    var url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=0a5b1052ae170535f09856db50fa8d9f&q=" + req.query['q'];
    request(url).pipe(res);
})

var dictionary_url = "https://owlbot.info/api/v1/dictionary/"
//append "term?format=json" to dictionary_url
router.get('/dictionary', function(req, res, next) {
    console.log("in dictionary");
    var url = dictionary_url + req.query['q'] + "?format=json";
    request(url).pipe(res);
})

router.get('/stackEX', function(req, res, next) {
    console.log("in stackEX route");
    var url = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + req.query['q'];
    request(url).pipe(res);
})

module.exports = router;
