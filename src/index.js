import './css/main.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h4>High from React...</h4>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
