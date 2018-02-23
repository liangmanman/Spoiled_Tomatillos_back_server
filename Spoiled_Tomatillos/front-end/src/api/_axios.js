import * as axiosClass from 'axios';
import { API_ENDPOINT, OMDB_API, } from '../constants';

export const axios = axiosClass.create({
    baseURL: API_ENDPOINT,
});

export const omdb_axios = axiosClass.create({
    baseURL: OMDB_API,
});
