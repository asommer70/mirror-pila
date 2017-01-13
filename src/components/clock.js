import React, { Component } from 'react';
import moment from 'moment';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment().format('h:mm'),
      date: moment().format('MMMM D YYYY')
    }

    setInterval(() => {
      this.setState({
        time: moment().format('h:mm'),
        date: moment().format('MMMM D YYYY')
      });
    }, 1000);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div id="clock">
            <div id="time">{this.state.time}</div>
            <div id="date">{this.state.date}</div>
          </div>
        </div>
      </div>
    )
  }
}
