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
