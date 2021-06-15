import { requirePropFactory } from '@material-ui/core';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.DB_CLIENTE_ID;
debugger;
const host = 'http://191.5.125.217:5002';
const clientId = process.env.DB_CLIENTE_ID;
const secretId = process.env.DB_SECRET_ID;

export function getDataToken() {
	return axios({
		url: `${host}/v1/auth/token`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'clientid': `${clientId}`,
			'secretid': `${secretId}`
		}
	})
	.then(function(data){
		console.log(data.data.token);
		debugger;
	})
	.catch (err => console.error(err))
}

getDataToken()
.then(res => console.log(res));