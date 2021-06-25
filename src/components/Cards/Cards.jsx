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
			dataUpdate: Date()
		}
		// debugger;
	}
	
	async componentDidMount() {
		// debugger;
		const response = await apiPatterns(this.state.campaing_id);
		console.log(this.props.user);
		
		this.setState({items: response})
	}
	
	handleLike = async(patternclotheid, reaction, keyItem) => {
		console.log('Curti');
		const self = this;
		const newItems = this.state.items;

		
		const returnData = await apiPatternLike(patternclotheid, reaction).then(function(data){
			console.log(keyItem);
			self.setState({result_action: data.result});
			// debugger;		
			
			return newItems[keyItem].isanswer = true;
		});

		this.setState({items: newItems, dataUpdate: Date()});

		// debugger;
	}

	handleDislike = (patternclotheid, reaction, keyItem) => {
		console.log('Não Curti');
		const self = this;
		const newItems = this.state.items;

		const returnData = apiPatternLike(patternclotheid, reaction).then(function(data){
			console.log(keyItem);
			self.setState({result_action: data.result});
			// debugger;		
			
			return newItems[keyItem].isanswer = true;
		});

		this.setState({items: newItems, dataUpdate: Date()});

		// debugger;
	}

	render() {
		const { items, dataUpdate } = this.state;
		// debugger;
		if (this.state.campaing_id === 0) {
			window.location.href = '/';
		}
		// debugger;
		return (
			<div className="cards-wrapper">
				{items.map((item, index) => (
					<div className={`cards card_${item.isanswer}`} key={item.patternclotheid}>
						<div className="count-items">x de x</div>
						<img src={`data:image/jpeg;base64,${item.photo}`} alt="" className="estampa" />
						<div className="infos">
							<h2>{`#${item.division}`}</h2>
							<h1>{item.name}</h1>
							<h1>campaing_id: {this.state.campaing_id}</h1>
							<h2>{`_${item.isanswer}`}</h2>
						</div>
						<div className="actions">
							<button type="button" className="dislike" onClick={() => this.handleDislike(item.patternclotheid, false, index)}>
								<FontAwesomeIcon icon={faThumbsDown} />
							</button>
							<button type="button" className="like" onClick={() => this.handleLike(item.patternclotheid, true, index)}>
								<FontAwesomeIcon icon={faThumbsUp} />
							</button>
						</div>
					</div>
				))}
			</div>
		);
	}
}