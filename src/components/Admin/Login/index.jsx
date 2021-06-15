import React, { PureComponent } from 'react';
import SignInSide from './SignInSide'

export default class Login extends PureComponent {
  state = {
    selectedOption: null
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
          <SignInSide />
      </div>
    );
  }
}
