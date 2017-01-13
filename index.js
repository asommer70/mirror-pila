const express = require('express');
const axios = require('axios');
const config = require('./config.json');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

const WEATHER_PARAMS = '?id=' + config.weather.cityId + '&units=' + config.weather.units + '&appid=' + config.weather.apiKey;

//
// Routes
//
app.get('/', (req, res) => {
  res.render('index');
});

// GET /api/outside data from outside temp sensor.
app.get('/api/outside', (req, res) => {
  axios.get(config.sensors.outsideUrl)
    .then(function(outsideRes) {
      res.json(outsideRes.data);
    })
    .catch(function (error) {
      console.log('outside GET error:', error);
    });
});

// GET data from Open Weather Maps.
app.get('/api/:type', (req, res) => {
  axios.get(config.weather.url + '/' + req.params.type + WEATHER_PARAMS)
    .then((owmRes) => {
      res.json(owmRes.data);
    });
});



//
// Start the apps.
//
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000!');
});
