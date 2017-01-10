import './css/main.css';
import zero1d from './img/01d.svg';
import zero1n from './img/01n.svg';


function main() {
  window.beans = 'Poop';

  var $app = document.getElementById('app');

  console.log('$app:', $app);
  $app.innerHTML += ' <strong>Ah Beans! And Tacos!</strong>';
}


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(main);
