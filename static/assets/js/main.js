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
      console.log(response);
      var weather = document.getElementById('weather');
      var html = '';

      html += '<div><h2>Temperature in ' + response.data.name + '</h2>';
      html += response.data.main.temp + '&deg; <br/><br/>';
      html += 'High: ' + response.data.main.temp_max + '&deg; <br/>';
      html += 'Low: ' + response.data.main.temp_min + '&deg; <br/>';
      html += '</div><br/>';

      html += '<div><h3>Conditions</h3>';
      html += '<strong>Clouds:</strong> ' + response.data.clouds.all + '%<br/>';
      html += '<strong>Description:</strong> ' + response.data.weather[0].main + '<br/>';
      html += '<img class="weather-icon" src="/static/assets/img/' + response.data.weather[0].icon + '.svg" />';
      html += '</div>';

      html += '<div><h4>Sunrise</h4>';
      html += moment.unix(response.data.sys.sunrise).format('h:mm:ss a');
      html += '</div>';

      html += '<div><h4>Sunset</h4>';
      html += moment.unix(response.data.sys.sunset).format('h:mm:ss a');
      html += '</div>';

      weather.innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });

}

// Update every hour.
setInterval(updateWeather, 1000 * 60 * 60);
