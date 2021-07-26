import axios from 'axios';
import * as settings from '../config.json';
import { getDataToken } from './apiToken';
import publicIp from "public-ip";

const host = settings.HOST;
const version = settings.VERSION;

async function token(){
	let dataToken;

	await getDataToken().then(res => {
		dataToken = res;
	});
	
	return dataToken;
}

async function listCampaign(token, client_ip){
	const tokenId = token;
	// const ip_address = client_ip;
	
	return axios({
		url: `${host}/${version}/campaign`,
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

async function makeAsync() {
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await listCampaign(token_id, ipv4);
	
	return patternLikReturn;
}

export function apiListCampaign(){
	return makeAsync();
}
