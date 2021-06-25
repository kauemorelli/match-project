import React, { PureComponent } from 'react';
import Header from '../Structure/Header';
// import Cards from './../Cards';
import Cards from '../Cards/Cards';

export default class CardsPage extends PureComponent {
  state = {
    selectedOption: null
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Header />
        <div className="main">
          <Cards { ...this.props } />
        </div>
      </div>
    );
  }
}
