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

async function postPatternLike(token, client_ip, patternclotheid, reaction){
	const tokenId = token;
	const ip_address = client_ip;
	const patternId = patternclotheid;
	const reactionBoolean = reaction;

	return axios({
		url: `${host}/${version}/patternclothelike`,
		method: 'post',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
		},
		data: {
			"patternclotheid": `${patternId}`,
			"like": `${reactionBoolean}`
		}
	})
	.then(function(data){
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync(patternclotheid, reaction) {
	const patternId = patternclotheid;
	const reactionData = reaction;
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await postPatternLike(token_id, ipv4, patternId, reactionData);
	// console.log(ipv4);

	return patternLikReturn;
}

export function apiPatternLike(patternclotheid, reaction){
	return makeAsync(patternclotheid, reaction);
}
