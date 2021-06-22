import axios from 'axios';
import * as settings from '../config.json';
import { getDataToken } from './apiToken';

const host = settings.HOST;
const version = settings.VERSION;

async function token(){
	let dataToken;

	await getDataToken().then(res => {
		dataToken = res;
	});
	
	return dataToken;
}

async function getLogin(token){
	const tokenId = token;

	return axios({
		url: `${host}/${version}/auth/login`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'login': `appMatchEstampa@teste.com`,
			'password': `CeA..App`
		}
	})
	.then(function(data){
		debugger;
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync() {
	const token_id = await token();
	const campaignList = await getLogin(token_id);

	return campaignList;
}

export function apiLogin(){
	return makeAsync();
}
