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

async function deleteDepartament(token, client_ip, id){
	const tokenId = token;
	const ip_address = client_ip;
	const id_departament = id;

	return axios({
		url: `${host}/${version}/department/${id_departament}`,
		method: 'delete',
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

async function makeAsync(data) {
	const idDepartament = data;
	const token_id = await token();
	const ipv4 = await publicIp.v4() || "";	
	const patternLikReturn = await deleteDepartament(token_id, ipv4, idDepartament);

	return patternLikReturn;
}

export function apiDeleteDepartaments(data){
	return makeAsync(data);
}
