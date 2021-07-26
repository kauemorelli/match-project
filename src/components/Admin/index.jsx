import React, { PureComponent } from 'react';
import Reports from './Reports';

export default class Admin extends PureComponent {
  state = {
    selectedOption: null
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
          <Reports />
      </div>
    );
  }
}
