import axios from 'axios';
import { API_PROD_ENDPOINT, API_DEV_ENDPOINT } from '../constants';

function setupAPI() {
  return process.env.NODE_ENV ? API_PROD_ENDPOINT : API_DEV_ENDPOINT;
};

export const s_t_Instance = axios.create({
  baseURL: setupAPI()
});
