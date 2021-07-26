import React, { PureComponent } from 'react';
import { apiPatterns } from '../../api/apiPatterns'
import { faThumbsUp, faThumbsDown, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import './Cards.scss';
import { apiPatternLike } from '../../api/apiPatternLike';
import TinderCard from 'react-tinder-card'

export default class Cards extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			campaing_id: this.props.location.state && this.props.location.state.campaing_id ? this.props.location.state.campaing_id : 0,
			setLastDirection: '',
			childRefs: [],
			dataUpdate: Date()
		}
	}
	
	async componentDidMount() {
		const response = await apiPatterns(this.state.campaing_id);
		
		this.setState({items: response});
	}

	swiped = (direction, nameToDelete, item, index) => {
		this.setState({setLastDirection: direction});
		
		if(direction === 'right') this.handleLike(item.patternclotheid, true, index);
		if(direction === 'left') this.handleDislike(item.patternclotheid, false, index);
	}

	outOfFrame = (name) => {
		console.log(name + ' left the screen!');
	}
	
	handleLike = async(patternclotheid, reaction, keyItem) => {
		const self = this;
		const newItems = this.state.items;

		await apiPatternLike(patternclotheid, reaction).then(function(data){
			console.log(keyItem);
			self.setState({result_action: data.result});
			newItems[keyItem].voted = true;
			
			return newItems[keyItem].isanswer = true;
		});

		this.setState({items: newItems, dataUpdate: Date()});
	}

	handleDislike = async(patternclotheid, reaction, keyItem) => {
		const self = this;
		const newItems = this.state.items;

		await apiPatternLike(patternclotheid, reaction).then(function(data){
			self.setState({result_action: data.result});
			newItems[keyItem].voted = true;
			
			return newItems[keyItem].isanswer = true;
		});

		this.setState({items: newItems, dataUpdate: Date()});
	}

	render() {
		const { items } = this.state;
		// let rows = null;
		let showEmptyMessage = false;
		let isLoading = true;

		if (this.state.campaing_id === 0) {
			window.location.href = '/';
		}

		if(items && items.length !== 0) {
			isLoading = false;
		}
		
		if (items && Array.isArray(items) && items.length > 0) {
			items.map(itemElement => {
				let elemetItem = itemElement.isanswer;
				let hasItemToVote = null;

				if(elemetItem) {
					showEmptyMessage = true;
					
				} else {
					showEmptyMessage = false;
				}

				hasItemToVote = showEmptyMessage;

				return hasItemToVote;
			});
		  }

		return (
			<div className="cards-wrapper">
				{items.map((item, index) => (
					<TinderCard className='swipe' key={item.patternclotheid} onSwipe={(dir) => this.swiped(dir, item.patternclotheid, item, index)} onCardLeftScreen={() => this.outOfFrame(item.patternclotheid)} preventSwipe={['up', 'down']}>
						<div className={`cards card_${item.isanswer}${item.voted ? ' voted' : ''}`} key={item.patternclotheid}>
							<div className="count-items">{items.length - index} de {items.length}</div>
							<img src={`${item.photo}`} alt="" className="estampa" />
							<div className="infos">
								<h2>{`#${item.division}`}</h2>
								<h1>{item.name}</h1>
							</div>
							<div className="actions">
								<button type="button" className="dislike" onClick={() => this.handleDislike(item.patternclotheid, true, index)}>
									<FontAwesomeIcon icon={faThumbsDown} />
								</button>
								<button type="button" className="like" onClick={() => this.props.swipe('right')}>
									<FontAwesomeIcon icon={faThumbsUp} />
								</button>
							</div>
						</div>
					</TinderCard>
				))}
				<div className="btn-back">
					<Link
						to={{ pathname: `/` }}
						className="rating-buttom"
						>
							<FontAwesomeIcon icon={faChevronLeft} />&nbsp; Voltar
					</Link>
				</div>
				{isLoading && (<div className="loading-wrap"><CircularProgress color="primary" /></div>)}

				{showEmptyMessage && (
					<div className="empty-cards">
						<p>Obg :) <span>todas as estampas foram votadas</span></p>
					</div>
				)}
			</div>
		);
	}
}