import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Editable from './tableEditable';
import { apiListReports } from '../../../api/apiListReports';
import './index.scss';

import MenuAdmin from '../menu-admin'
import { Button, Paper, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { apiListDepartaments } from '../../../api/apiListDepartaments';
import { apiListCampaign } from '../../../api/apiListCampaign';

import 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import moment from 'moment';
moment.locale('pt-br');

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://www.cea.com.br/">
				cea.com.br
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		backgroundColor: '#ffffff'
	},
	title: {
		flexGrow: 1,
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(3),
		margin: '0 0 30px 0',
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
		selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

//   const validate = values => {
// 	const errors = {};
// 	if (!values.firstName) {
// 	  errors.firstName = 'Required';
// 	}
// 	if (!values.lastName) {
// 	  errors.lastName = 'Required';
// 	}
// 	if (!values.email) {
// 	  errors.email = 'Required';
// 	}
// 	return errors;
//   };

export default function Reports() {
	const { useState } = React;
  
	const classes = useStyles();
	
	const [departamentSelected, setDepartamentSelect] = useState([]);
	const [campaignSelected, setCampaignSelect] = useState([]);

	const [departamentList, setDepartamentList] = useState([]);
	const [campaignList, setCampaignList] = useState([]);
	const [data, setData] = useState([]);

	async function listDepartaments() {
		await apiListDepartaments().then(function(data){
			setDepartamentList(data);
		});
	}
	async function listCampaign() {
		await apiListCampaign().then(function(data){
			setCampaignList(data);
		});
	}

	async function listItems(departament, campaign, datastart, dataend) {
		await apiListReports(departament, campaign, datastart, dataend).then(function(data){
			setData(data);
		});
	}

	const onSubmit = async values => {
		values.preventDefault();
		let departament = values.currentTarget[0].value;
		let campaign = values.currentTarget[1].value;
		const datastart = values.currentTarget[2].value;
		const dataend = values.currentTarget[3].value;
		
		if(!departament) {
			departament = 0;
		}
		if(!campaign) {
			campaign = 0;
		}
		
		listItems(departament, campaign, datastart, dataend);
	};

	useEffect(() => {
		(async () => {
			listDepartaments();
			listCampaign();
		})();
	}, []);

	const handleChangeDepartament = (event) => {
		setDepartamentSelect(event.target.value);
	};

	const handleChangeCampaign = (event) => {
		setCampaignSelect(event.target.value);
	};

	return (
		<div className={classes.root}>
			<MenuAdmin />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid item xs={12}>
							<Paper className={classes.paper}>
								<h1>Filtros</h1>
								<form onSubmit={onSubmit}>
									<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
										<Grid container xs="12" spacing="1">
											<Grid item xs={12} sm={3}>
												<FormControl className={classes.formControl}>
													<InputLabel id="campaign-label">Departamento</InputLabel>
													<Select
														labelId="campaign-label"
														id="select-campaign"
														value={departamentSelected}
														onChange={handleChangeDepartament}
													>
														{departamentList && (
															departamentList.map(item => <MenuItem value={item.departmentid}>{item.name}</MenuItem>)
														)}
													</Select>

												</FormControl>
											</Grid>
											<Grid item xs={12} sm={3}>
												<FormControl className={classes.formControl}>
													<InputLabel id="demo-simple-select-label2">Campanha</InputLabel>
													<Select
														labelId="demo-simple-select-label2"
														id="demo-simple-select2"
														value={campaignSelected}
														onChange={handleChangeCampaign}
													>
														{campaignList && (
															campaignList.map(item => <MenuItem value={item.campaignid}>{item.name}</MenuItem>)
														)}
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={12} sm={3}>
												<TextField
													id="datestart"
													label="Início"
													type="date"
													defaultValue="2020-12-12"
													className={classes.textField}
													InputLabelProps={{
														shrink: true,
													}}
													locale={ptBR}
												/>
												
											</Grid>
											<Grid item xs={12} sm={3}>
												<TextField
													id="dateend"
													label="Fim"
													type="date"
													defaultValue="2021-12-12"
													className={classes.textField}
													InputLabelProps={{
														shrink: true,
													}}
												/>
											</Grid>
											<Grid item xs={12} sm={12}>
												<Button
													variant="contained"
													color="primary"
													type="submit"
												>
													Buscar
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</form>
							</Paper>
					</Grid>
					<Grid item xs={12}>
						<Editable dataItems={data} />
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}