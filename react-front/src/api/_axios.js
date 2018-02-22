import * as axiosClass from 'axios';
import { API_ENDPOINT, } from '../constants';

export const axios = axiosClass.create({
    baseURL: API_ENDPOINT,
});
