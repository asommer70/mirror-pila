import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Icon from './icon';

export default class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: []
    }

    axios.get('/api/forecast')
      .then((res) => {
        let days = {};

        // Loop through the list of days.
        res.data.list.forEach((day) => {
          // Get a date "key" to add time data organized by day.
          let dayKey = moment.unix(day.dt).format('MMDDYYYY');

          // Get the required data.
          let dayData = {
            dt: day.dt,
            date: moment.unix(day.dt).format('MMMM, DD YYYY h:mm:ss a'),
            icon: day.weather[0].icon,
            temp_max: day.main.temp_max,
            temp_min: day.main.temp_max
          }

          if (days.hasOwnProperty(dayKey)) {
            days[dayKey].push(dayData);
          } else {
            days[dayKey] = [dayData];
          }
        });

        // Reduce the days to a high, low, and icon.
        let daysMinMax = [];
        for (var key in days) {
          let day = days[key];

          // Sort by temp_min.
          let mins = day.sort((a, b) => {
            return a.temp_min - b.temp_min;
          });

          // Create a return object.
          let dayData = {
            date: moment.unix(mins[0].dt).format('MMMM, DD YYYY'),
            temp_min: mins[0].temp_min,
            min_icon: mins[0].icon
          };

          // Sort by temp_max.
          let maxs = mins.sort((a, b) => {
            return b.temp_max - a.temp_max;
          });

          // Add the max to the return object.
          dayData.temp_max = maxs[0].temp_max;
          dayData.max_icon = maxs[0].icon;

          daysMinMax.push(dayData);
        }

        this.setState({forecast: daysMinMax});
      });
  }

  render() {
    return (
      <div>
        <h2>Forecast</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th colSpan="2">Min</th>
              <th colSpan="2">Max</th>
            </tr>
            <tr><td><br/></td><td></td><td></td></tr>
          </thead>
          <tbody>
            {this.state.forecast.map((day) => {
              return (
                <tr key={day.date}>
                  <td>
                    <span className="dayDate">{day.date}</span>
                  </td>
                  <td>
                    {day.temp_min}
                  </td>
                  <td>
                     <span className="dayIcon"><Icon name={day.min_icon} /></span>
                  </td>
                  <td>
                    {day.temp_max}
                  </td>
                  <td>
                     <span className="dayIcon"><Icon name={day.max_icon} /></span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
