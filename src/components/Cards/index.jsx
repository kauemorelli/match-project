import React, { PureComponent } from 'react';
//import axios from 'axios';
import apiPatterns from '../../api/apiPatterns'
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Cards.scss';

export default class Header extends PureComponent {
	state = {
		items: []
	};

	async componentDidMount() {
		const response = await apiPatterns.get();

		this.setState({items: response.data})
	}

	handleLike = () => {
		console.log('Crti');
		debugger;
		// axios.post(`http://localhost:3000/`, { estampa })
		//   .then(res => {
		//     console.log(res);
		//     console.log(res.data);
		//   })
	}

	handleDislike = () => {
		console.log('Não Curti');
		debugger;
		// axios.post(`http://localhost:3000/`, { estampa })
		//   .then(res => {
		//     console.log(res);
		//     console.log(res.data);
		//   })
	}

	render() {
		const { items } = this.state;

		return (
			<div className="cards-wrapper">
				{items.map(item => (
					<div className="cards" key={item.imageid}>
						<img src={`data:image/jpeg;base64,${item.photo}`} alt="" className="estampa" />
						<div className="actions">
							<button type="button" className="dislike" onClick={() => this.handleLike()}>
								<FontAwesomeIcon icon={faThumbsDown} />
							</button>
							<button type="button" className="like" onClick={() => this.handleDislike()}>
								<FontAwesomeIcon icon={faThumbsUp} />
							</button>
						</div>
					</div>
				))}
			</div>
		);
	}
}
