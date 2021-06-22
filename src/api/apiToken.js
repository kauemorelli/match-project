import axios from 'axios';
import * as settings from '../config.json';

// const host = 'http://191.5.125.217:5002';
// const clientId = '44c92a00-8c90-4b09-b1ff-ac9f7997ca3a';
// const secretId = '3cb1db06-14cc-40d9-8d35-02ef47b03893';
const host = settings.HOST;
const version = settings.VERSION;
const client_id = settings.REACT_APP_API_CLIENT_ID;
const secret_id = settings.REACT_APP_API_SECRET_ID;

export function getDataToken() {
	return axios({
		url: `${host}/${version}/auth/token`,
		method: 'get',
		timeout: 8000,
		headers: {
			'Content-Type': 'application/json',
			'clientid': `${client_id}`,
			'secretid': `${secret_id}`
		}
	})
	.then(function(data){
		// console.log('data.data.token');
		// console.log(data.data.token);
		// debugger;
		return data.data.token;
	})
	.catch (err => console.error(err))
}