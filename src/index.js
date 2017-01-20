import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './css/simple-grid.css';
import './css/main.css';


import LocalWeather from './components/local_weather';
import Clock from './components/clock';
import SensorTemp from './components/sensor_temp';
import Forecast from './components/forecast';

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <LocalWeather />
          </div>
          <div className="col-6">
            <Clock />

            <SensorTemp />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Forecast />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
