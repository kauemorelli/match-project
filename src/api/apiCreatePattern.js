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

async function createPattern(token, client_ip, namePattern, campaignid, division, theme, color, photo){
	const tokenId = token;
	const ip_address = client_ip;

	return axios({
		url: `${host}/${version}/patternclothe`,
		method: 'post',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
		},
		data: {
			"campaignid": campaignid,
			"name": `${namePattern}`,
			"division": `${division}`,
			"theme": `${theme}`,
			"color": `${color}`,
			"photo": `${photo}`
		}
	})
	.then(function(data){
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync(data, campaignId) {
	const namePattern = data.name;
	const division = data.division;
	const theme = data.theme;
	const color = data.color;
	const photo = data.photo;
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await createPattern(token_id, ipv4, namePattern, campaignId, division, theme, color, photo);

	return patternLikReturn;
}

export function apiCreatePattern(data, campaignId){
	return makeAsync(data, campaignId);
}
