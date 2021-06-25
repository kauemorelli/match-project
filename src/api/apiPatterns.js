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

async function getPatternClothe(token, campaing_id){
	const tokenId = token;

	return axios({
		url: `${host}/${version}/patternclothe/campaign/${campaing_id}`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'login': `appMatchEstampa@teste.com`
		}
	})
	.then(function(data){
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync(campaing_id) {
	const token_id = await token();
	const patternClotheList = await getPatternClothe(token_id, campaing_id);

	return patternClotheList;
}

export function apiPatterns(campaing_id){
	return makeAsync(campaing_id);
}