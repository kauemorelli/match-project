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

async function updatePattern(token, client_ip, campaignid, patternclotheid, name, theme, color, division, photo){
	const tokenId = token;
	const ip_address = client_ip;
	const campaign_id = campaignid;
	const id = patternclotheid;
	const nameData = name;
	const themeName = theme;
	const patternColor = color;
	const patternDivision = division;
	const patternPhoto = photo;

	return axios({
		url: `${host}/${version}/patternclothe/${id}`,
		method: 'PUT',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
		},
		data: {
			"campaignid": campaign_id,
			"patternclotheid": id,
			"name": `${nameData}`,
			"theme": `${themeName}`,
			"color": `${patternColor}`,
			"division": `${patternDivision}`,
			"photo": `${patternPhoto}`
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
	const campaignid = data.campaignid;
	const patternclotheid = data.patternclotheid;
	const nameDepartament = data.name;
	const theme = data.theme;
	const patternColor = data.color
	const patternDivision = data.division
	const patternPhoto = data.photo
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	
	const patternLikReturn = await updatePattern(token_id, ipv4, campaignid, patternclotheid, nameDepartament, theme, patternColor, patternDivision, patternPhoto);

	return patternLikReturn;
}

export function apiUpdatePattern(data){
	return makeAsync(data);
}
