import React, { PureComponent } from 'react';
import logocea from './../../cea-logo.svg'
import './Header.scss';

export default class Header extends PureComponent {
  state = {
    selectedOption: null
  };

  componentDidMount() {
  }

  render() {
    return (
      <header className="header clearfix">
        <nav className="title-header">
          <h1>match de <br />estampas</h1>
        </nav>

        <div className="logo-box">
          <img src={logocea} className="logo" alt="logo" />
        </div>
      </header>
    );
  }
}
