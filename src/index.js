import './css/simple-grid.css';
import './css/main.css';

import LocalWeather from './components/local_weather';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <LocalWeather />
        </div>
        <div className="col-6">

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
