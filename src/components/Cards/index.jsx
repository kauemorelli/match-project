import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Cards.scss';
import { apiCampaing } from '../../api/apiCampaing';
import { connect } from 'react-redux';
import { loadUser, logout } from '../../store/actions/user';
import Cards from './Cards';

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
		const { user } = this.props;
		// debugger;
		// console.log('Pure user');
		// console.log(user);
		
		return (
			<div className="list-cards">
				<h2>Campanhas</h2>
				<p>Olá Kauê, escolha o melhor match de estampas</p>
				{/* {items.map(item => (
					<div key={item.campaignid}>
						{!item.active ? (
							<div className="item">
								<div className="text">
									<h3>{item.name}</h3>
									<p>{item.datestart} a {item.dateend}</p>
								</div>
								<div className="action">
									<Link to={`/cards?id=${item.campaignid}`} className="rating-buttom">Participar</Link>
								</div>
							</div>
						) : <p>Nenhuma campanha pra votação</p>}
					</div>
				))} */}

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
									to={
										{
											pathname: `/cards/${item.campaignid}`,
											state: {                      
												campaing_id: `${item.campaignid}`,
											}
										}
									}
									// to={`/cards/${item.campaignid}`}
									// campaing_id={`${item.campaignid}`}
									className="rating-buttom"
								>Participar</Link>
								
							</div>
						) : (
							<div className="action">
								<Link className="rating-buttom rated">Votado</Link>
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