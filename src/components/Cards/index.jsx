import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Cards.scss';
import { apiCampaing } from '../../api/apiCampaing';
import { connect } from 'react-redux';
import { loadUser, logout } from '../../store/actions/user';
import CircularProgress from '@material-ui/core/CircularProgress';

class ListCampaing extends PureComponent {
	state = {
		items: []
	};

	async componentDidMount() {
		const response = await apiCampaing();

		// this.props.loadUser(1);
		
		this.setState({ items: response });
	}

	render() {
		const { items } = this.state;
		// const { user } = this.props;

		let isLoading = true;
		
		if(items && items.length !== 0) {
			isLoading = false;
		}
		
		// ADD valicação de items
		items.sort((a, b) => (
			(a.isanswer === null) - (b.isanswer === null)
			|| a.isanswer - b.isanswer
			|| b.campaignid - a.campaignid
		));
		
		return (
			<div className="list-cards">
				<p className="welcome">Olá <span>André</span>,<br />escolha as melhores estampas:</p>
				<h2>Campanhas</h2>
				{isLoading && (<div className="loading-wrap"><CircularProgress color="primary" /></div>)}
				{items.map(item => (
					<div className="item" key={item.campaignid}>
						{item.active && (
							<div className="text">
								<h3>{item.name}</h3>
								<p>{item.datestart} a {item.dateend}</p>
								{/* <input type="number" value={user.name} onChange={e => this.props.loadUser(e.target.value)} />
								<input type="number" value="" onChange={e => this.props.logout(e.target.value)} /> */}
							</div>
						)}
						{!item.isanswer ? (
							<div className="action">
								<Link
									to={{
										pathname: `/cards/${item.campaignid}`,
										state: {                      
											campaing_id: `${item.campaignid}`,
										}
									}}
									className="rating-buttom"
								>Participar</Link>
							</div>
						) : (
							<div className="action">
								<Link to={'/#'} className="rating-buttom rated">Votado</Link>
							</div>
						)}
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadUser(data) {
			// Action creator -> Action
			const action = loadUser(data);
			dispatch(action);
		},
		logout(data) {
			// Action creator -> Action
			const action = logout(data);
			dispatch(action);
		},
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCampaing);