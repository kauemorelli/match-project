import axios from 'axios';
import * as settings from '../config.json';
import { getDataToken } from './apiToken';
import publicIp from "public-ip";
import moment from 'moment-timezone';

const host = settings.HOST;
const version = settings.VERSION;

async function token(){
	let dataToken;

	await getDataToken().then(res => {
		dataToken = res;
	});
	
	return dataToken;
}

async function createCampaign(token, client_ip, data){
	const tokenId = token;
	const ip_address = client_ip;
	const name = data.name;
	const datestart = moment.tz(data.datestart, 'America/Sao_Paulo').format();
	const dateend = moment.tz(data.dateend, 'America/Sao_Paulo').format();
	const statusBoolean = data.active;
	const departmentId = data.departmentid;

	return axios({
		url: `${host}/${version}/campaign`,
		method: 'post',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
		},
		data: {
			"name": `${name}`,
			"datestart": `${datestart}`,
			"dateend": `${dateend}`,
			"active": statusBoolean,
			"departmentid": departmentId
		}
	})
	.then(function(data){
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync(data) {
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await createCampaign(token_id, ipv4, data);

	return patternLikReturn;
}

export function apiCreateCampaign(data){
	return makeAsync(data);
}
