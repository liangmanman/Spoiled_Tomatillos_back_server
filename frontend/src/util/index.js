import Cookies from 'universal-cookie';
import _ from 'lodash';
import { axios } from '../api/_axios';

const cookies = new Cookies();

const changeAxiosInstanceXAccessTokenHeader = (token) => {
    axios.defaults.headers['x-access-token'] = token;
};

export const getXAccessTokenFromCookie = () => {
    return cookies.get('x-access-token');
};


export const setXAccessToken = (token) => {
    if (_.isNil(token)) {
        cookies.remove('x-access-token');
    } else {
        cookies.set('x-access-token', token);
    }

    changeAxiosInstanceXAccessTokenHeader(token);
};
