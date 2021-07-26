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

async function listReports(token, client_ip, departmantid, campaignid, datestart, dateend){
	const tokenId = token;
	const ip_address = client_ip;
	
	return axios({
		url: `${host}/${version}/report/bydate?departmantid=${departmantid}&campaignid=${campaignid}&datestart=${datestart}&dateend=${dateend}`,
		method: 'get',
		timeout: 80000,
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

async function makeAsync(departmantid, campaignid, datestart, dateend) {
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await listReports(token_id, ipv4, departmantid, campaignid, datestart, dateend);
	
	return patternLikReturn;
}

export function apiListReports(departmantid, campaignid, datestart, dateend){
	return makeAsync(departmantid, campaignid, datestart, dateend);
}
