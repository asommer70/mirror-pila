import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Icon from './icon';

export default class LocalWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: null,
      temp_max: null,
      temp_min: null,
      clouds: null,
      conditions: null,
      icon: null
    }
  }

  componentWillMount() {
    // Get data from the API.
    axios.get('/api/weather')
      .then((res) => {
        var clouds;
        if (res.data.clouds.hasOwnProperty('all')) {
          clouds = res.data.clouds.all;
        }

        this.setState({
          temp: res.data.main.temp,
          temp_max: res.data.main.temp_max,
          temp_min: res.data.main.temp_min,
          clouds: clouds,
          conditions: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          sunrise: moment.unix(res.data.sys.sunrise).format('h:mm:ss a'),
          sunset: moment.unix(res.data.sys.sunset).format('h:mm:ss a')
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <div>
              <h2 id="city_name"></h2>
              <p>Current: <strong><span id="current_temp">{this.state.temp}</span>&deg;</strong> </p>

              <p>
                High: <span id="high_temp">{this.state.temp_max}</span>&deg;
                <br/>
                Low: <span id="low_temp">{this.state.temp_min}</span>&deg;
              </p>

              <br/>
              <br/><br/>
            </div>
          </div>

          <div className="col-6">
            <div>
              <h2>Conditions:</h2> <span id="conditions">{this.state.conditions}</span>
              <br/>
              <strong>Clouds:</strong> <span id="clouds">{this.state.clouds}</span>%
              <br/>
              <Icon name={this.state.icon} />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-6">
              <div>
                <strong>Sunrise:</strong> &nbsp;
                <span id="sunrise">{this.state.sunrise}</span>
                <br/>
                <strong>Sunset:</strong> &nbsp;
                <span id="sunset">{this.state.sunset}</span>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
