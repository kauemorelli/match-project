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

async function updateDepartament(token, client_ip, idDepartament, name, status){
	const tokenId = token;
	const ip_address = client_ip;
	const nameData = name;
	const statusBoolean = status;
	const id = idDepartament

	return axios({
		url: `${host}/${version}/department/${id}`,
		method: 'PUT',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokenId}`,
			'client_ip': `${ip_address}`,
			'login': `appMatchEstampa+${ip_address}@teste.com`
		},
		data: {
			"departmentid": id,
			"name": `${nameData}`,
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
	const idDepartament = data.departmentid;
	const nameDepartament = data.name;
	const statusDepartament = data.active;
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await updateDepartament(token_id, ipv4, idDepartament, nameDepartament, statusDepartament);

	return patternLikReturn;
}

export function apiUpdateDepartaments(data){
	return makeAsync(data);
}
