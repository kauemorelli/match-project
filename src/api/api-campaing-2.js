import axios from 'axios';
import dotenv from 'dotenv';

const host = 'http://191.5.125.217:5002';
dotenv.config()
const API_CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;
console.log('IhUUUUUUUUUUUUL');
console.log(process.env);
// debugger;

const apiCampaing = axios.create({
  baseURL: host +'/v1/campaign',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkZyb250LUVuZCBNYXRjaCBkZSBFc3RhbXBhcyIsInJvbGUiOiJBY2Vzc28gQVBJIiwiZW1haWwiOiJmcm9udEB0ZXN0ZS5jb20uYnIiLCJuYW1laWQiOiI0NGM5MmEwMC04YzkwLTRiMDktYjFmZi1hYzlmNzk5N2NhM2EiLCJuYmYiOjE2MjM3NzU4MDEsImV4cCI6MTYyMzc4MzAwMSwiaWF0IjoxNjIzNzc1ODAxfQ.ia6xEZBnnz7epK58TQMfK1bTrJIMLPB_1amHFtDJ-X0'
  }
});
	
export default apiCampaing;