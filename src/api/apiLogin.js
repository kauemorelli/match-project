import axios from 'axios';
import * as settings from '../config.json';
import { getDataToken } from './apiToken';

const host = settings.HOST;
const version = settings.VERSION;

// async function token(){
// 	let dataToken;

// 	await getDataToken().then(res => {
// 		dataToken = res;
// 	});
	
// 	return dataToken;
// }

async function getLogin(email, pass){
	// const tokenId = token;
	const mailaddress = email;
	const password = pass;

	return axios({
		url: `${host}/${version}/auth/login`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'login': `${mailaddress}`,
			'password': `${password}`
		}
	})
	.then(function(data){
		return data.data;
	})
	.catch (err => {
		console.error(err)
	})
}

async function makeAsync(email, pass) {
	const authLogin = await getLogin(email, pass);

	return authLogin;
}

export function apiLogin(email, pass){
	return makeAsync(email, pass);
}
