import React, { PureComponent } from 'react';
import Login from './Login/index'

export default class Admin extends PureComponent {
  state = {
    selectedOption: null
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
          <Login />
      </div>
    );
  }
}
