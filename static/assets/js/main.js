//
// Get and display the clock.
//
function updateClock() {
  var clock = document.getElementById('clock');
  var date = moment().format('MMMM D YYYY');
  var time = moment().format('h:mm');
  clock.innerHTML = '<div id="time">' + time + '</div>';
  clock.innerHTML += '<div id="date">' + date + '</div>';
}

setInterval(updateClock, 1000);

//
// Get the curent temp in Boone.
//
function updateWeather() {
  axios.get('/api/weather')
    .then(function (response) {
      document.getElementById('city_name').innerHTML = response.data.name;
      document.getElementById('current_temp').innerHTML = response.data.main.temp;
      document.getElementById('high_temp').innerHTML = response.data.main.temp_max;
      document.getElementById('low_temp').innerHTML = response.data.main.temp_min;

      document.getElementById('conditions').innerHTML = response.data.weather[0].main;
      document.getElementById('clouds').innerHTML = response.data.clouds.all;
      document.getElementById('weather-icon').setAttribute('src', '/static/assets/img/' + response.data.weather[0].icon + '.svg');

      document.getElementById('sunrise').innerHTML = moment.unix(response.data.sys.sunrise).format('h:mm:ss a');
      document.getElementById('sunset').innerHTML = moment.unix(response.data.sys.sunset).format('h:mm:ss a');

    })
    .catch(function (error) {
      console.log(error);
    });

}

// Call updateWeather() once to populate the page onload, then update every hour.
updateWeather();
setInterval(updateWeather, 1000 * 60 * 60);

//
// Get the forecast for Boone.
//
function updateForecast() {
  axios.get('/api/forecast')
    .then(function (response) {
      var list = adjustForecastData(response.data.list);
      console.log('list:', list);
      var source   = document.getElementById("forecast").innerHTML;
      var template = Handlebars.compile(source);
      document.getElementById('forecast-html').innerHTML = template({list: list});
    })
    .catch(function (error) {
      console.log(error);
    });
}

//
// Get data for each day and put it in it in a new object.
// Returns an array of days with temp data and times.
//
function adjustForecastData(data) {
  days = [];
  for (var i = 0; i < 6; i++) {
    var dayKey = moment().add(i, 'day').format('MDY');
    var day = moment().add(i, 'day').format('M-D-Y');

    days[dayKey] = {
      day: day,
      times: [],
    };
  }

  data.forEach(function(item) {
    var date = moment.unix(item.dt);
    var dateKey = date.format('MDY');
    var time = date.utcOffset(new Date().getTimezoneOffset()).format('hh:mm:ss');
  
    var rain = 0; 
    if (item.rain.hasOwnProperty('3h')) {
      rain = Math.round(item.rain['3h'] * 100);
    }
    
    var timeData = {
      time: time,
      temp_max: item.main.temp_max,
      temp_min: item.main.temp_min,
      rain: rain,
      clouds: item.clouds.all,
      condition: item.weather[0].description,
      icon: item.weather[0].icon,
    }

    days[dateKey].times.push(timeData);
  })

  return days;
}

//adjustForecastData([]);

// Call updateWeather() once to populate the page onload, then update every hour.
updateForecast();
setInterval(updateForecast, 1000 * 60 * 60);
