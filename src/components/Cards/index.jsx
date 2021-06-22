import React, { PureComponent } from 'react';
import { apiPatterns } from '../../api/apiPatterns'
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Cards.scss';

export default class Cards extends PureComponent {
	state = {
		items: []
	};
	
	async componentDidMount() {
		const response = await apiPatterns();
		console.log(this.props.user);
		
		this.setState({items: response})
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

		console.log(this.props.propsItens);
		return (
			<div className="cards-wrapper">
				{items.map(item => (
					<div className="cards" key={item.campaignid}>
						<div className="count-items">1 de 10</div>
						<img src={`data:image/jpeg;base64,${item.photo}`} alt="" className="estampa" />
						<div className="infos">
							<h2>{`#${item.division}`}</h2>
							<h1>{item.name}</h1>
						</div>
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