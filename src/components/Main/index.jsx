import React, { PureComponent } from 'react';
import Header from './../Structure/Header';
// import Cards from './../Cards';
import ListCards from './../Cards/ListCards';

export default class Main extends PureComponent {
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
          <ListCards />
        </div>
      </div>
    );
  }
}
