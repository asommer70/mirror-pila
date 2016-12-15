//$('#clock').fitText(1.3);

function update() {
  var clock = document.getElementById('clock');
  var date = moment().format('MMMM D YYYY');
  var time = moment().format('h:mm');
  clock.innerHTML = '<div id="time">' + time + '</div>';
  clock.innerHTML += '<div id="date">' + date + '</div>';
}

setInterval(update, 1000);
