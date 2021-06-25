import React, { PureComponent } from 'react';
import Header from './../Structure/Header';
// import Cards from './../Cards';
import ListCampaing from '../Cards';

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
          <ListCampaing />
        </div>
      </div>
    );
  }
}
