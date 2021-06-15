import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Cards.scss';
import apiCampaing from '../../api/apiCampaing'

export default class ListCards extends PureComponent {
  state = {
    items: []
  };

  async componentDidMount() {
    const response = await apiCampaing.get();

    this.setState({ items: response.data });
  }

  render() {
    const { items } = this.state;
    
    return (
      <div className="list-cards">
        <h2>Campanhas</h2>

        {items.map(item => (
          <div className="item" key={item.campaignid}>
            {item.active && (
              <div className="text">
                <h3>{item.name}</h3>
                <p>{item.datestart} a {item.dateend}</p>
              </div>
            )}
            {item.active && (
              <div className="action">
                <Link to="/cards" className="rating-buttom">Participar</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
