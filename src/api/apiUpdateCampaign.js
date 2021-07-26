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
	
	return dataToken;
}

async function updateCampaign(token, client_ip, dataItem){
	const tokenId = token;
	const ip_address = client_ip;
	const nameData = dataItem.name;
	const campaignid = dataItem.campaignid;
	const datestart = moment.tz(dataItem.datestart, 'America/Sao_Paulo').format();
	const dateend = moment.tz(dataItem.dateend, 'America/Sao_Paulo').format();
	const statusBoolean = dataItem.active;
	const departamentId = dataItem.departmentid;
	
	return axios({
		url: `${host}/${version}/campaign/${campaignid}`,
		method: 'PUT',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
		},
		data: {
			"name": `${nameData}`,
			"datestart": `${datestart}`,
			"dateend": `${dateend}`,
			"departmentid": departamentId,
			"active": statusBoolean
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
	const patternLikReturn = await updateCampaign(token_id, ipv4, data);

	return patternLikReturn;
}

export function apiUpdateCampaign(data){
	return makeAsync(data);
}
