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

async function getPatternByCampaign(token, client_ip, campaing_id){
	const tokenId = token;
	const ip_address = client_ip;
	
	return axios({
		url: `${host}/${version}/patternclothe/${campaing_id}`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
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
	const ipv4 = await publicIp.v4() || "";	
	const patternClotheList = await getPatternByCampaign(token_id, ipv4, campaing_id);

	return patternClotheList;
}

export function apiGetPatternByCampaign(campaing_id){
	return makeAsync(campaing_id);
}