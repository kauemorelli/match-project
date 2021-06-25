import React, { PureComponent } from 'react';
import { apiPatterns } from '../../api/apiPatterns'
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Cards.scss';
import { apiPatternLike } from '../../api/apiPatternLike';

export default class Cards extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			campaing_id: this.props.location.state && this.props.location.state.campaing_id ? this.props.location.state.campaing_id : 0, 
		}
		debugger;
	}
	
	async componentDidMount() {
		debugger;
		const response = await apiPatterns(this.state.campaing_id);
		console.log(this.props.user);
		
		this.setState({items: response})
	}
	
	handleLike = (patternclotheid, reaction) => {
		console.log('Curti');
		
		const returnLikeApi = apiPatternLike(patternclotheid, reaction);
		// debugger;
	}

	handleDislike = (patternclotheid, reaction) => {
		console.log('Não Curti');

		const returnLikeApi = apiPatternLike(patternclotheid, reaction);
		// debugger;
	}

	render() {
		const { items } = this.state;
		// console.log(campaing_id);

		if (this.state.campaing_id === 0) {
			window.location.href = '/';
		}
		// console.log(this.props.propsItens);
		return (
			<div className="cards-wrapper">
				{items.map(item => (
					<div className="cards" key={item.patternclotheid}>
						<div className="count-items">1 de 10</div>
						<img src={`data:image/jpeg;base64,${item.photo}`} alt="" className="estampa" />
						<div className="infos">
							<h2>{`#${item.division}`}</h2>
							<h1>{item.name}</h1>
							<h1>campaing_id: {this.state.campaing_id}</h1>
						</div>
						<div className="actions">
							<button type="button" className="dislike" onClick={() => this.handleDislike(item.patternclotheid, false)}>
								<FontAwesomeIcon icon={faThumbsDown} />
							</button>
							<button type="button" className="like" onClick={() => this.handleLike(item.patternclotheid, true)}>
								<FontAwesomeIcon icon={faThumbsUp} />
							</button>
						</div>
					</div>
				))}
			</div>
		);
	}
}