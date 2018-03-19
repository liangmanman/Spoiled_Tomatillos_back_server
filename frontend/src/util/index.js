import Cookies from 'universal-cookie';
import _ from 'lodash';
import queryString from 'query-string';

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

export const parseQueryString = (location) => {
    return queryString.parse(this.props.location.search);

};

export const generateUserURI = (userId, uri) => {
    return _.replace(uri, ':userId', userId);
};

export const generateMovieURI = (movieId, uri) => {
    return _.replace(uri, ':movieId', movieId);
};
