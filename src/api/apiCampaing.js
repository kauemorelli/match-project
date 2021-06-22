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

async function getCampaing(token){
	const tokenId = token;

	return axios({
		url: `${host}/${version}/campaign`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`
		}
	})
	.then(function(data){
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync() {
	const token_id = await token();
	const campaignList = await getCampaing(token_id);

	return campaignList;
}

export function apiCampaing(){
	return makeAsync();
}
