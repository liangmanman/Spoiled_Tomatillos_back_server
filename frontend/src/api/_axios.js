import * as axiosClass from 'axios';
import { API_ENDPOINT, OMDB_API } from '../constants';
import { getXAccessTokenFromCookie } from '../util';

export const axios = axiosClass.create({
  baseURL: API_ENDPOINT,
    headers: {
      'x-access-token': getXAccessTokenFromCookie(),
    }
});

export const omdb_axios = axiosClass.create({
  baseURL: OMDB_API,
});
