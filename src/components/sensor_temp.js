import React, { Component } from 'react';
import axios from 'axios';

export default class SensorTemp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outsideTemp: null,
      humidity: null,
      insideTemp: null
    }

    axios.get('/api/outside')
      .then((res) => {
        this.setState({outsideTemp: res.data.temp, humidity: res.data.humidity})
      })
      .catch(function (error) {
        console.log('GET /api/outside error:', error);
      });

    axios.get('/data/inside_temp.json')
      .then((res) => {
        this.setState({insideTemp: res.data.temp});
      })
      .catch(function (error) {
        console.log('GET inside_temp.json error:', error);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">

            <h2>Outside Temp: <span id="outside-temp">{this.state.outsideTemp}</span>&deg;</h2>
            <p>Humidity: <span id="outside-humidity">{this.state.humidity}</span>%</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">

            <h2>Inside Temp: <span id="inside-temp">{this.state.insideTemp}</span>&deg;</h2>
          </div>
        </div>
      </div>
    )
  }
}
