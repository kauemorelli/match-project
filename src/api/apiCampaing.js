import axios from 'axios';
import * as settings from '../config.json';
import { getDataToken } from './apiToken';
import publicIp from "public-ip";
import moment from 'moment';

const host = settings.HOST;
const version = settings.VERSION;

async function token(){
	let dataToken;

	await getDataToken().then(res => {
		dataToken = res;
	});
	// debugger;
	return dataToken;
}

async function getCampaing(token, client_ip){
	const tokenId = token;
	const ip_address = client_ip;

	return axios({
		url: `${host}/${version}/campaign`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa@teste.com`
		}
	})
	.then(function(data){
		// debugger;
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync() {
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const campaignList = await getCampaing(token_id, ipv4);
	console.log(ipv4);
	// debugger;

	return campaignList;
}

export function apiCampaing(){
	return makeAsync();
}
