const API = '/api';

export const SIGNUP_API = API + '/users/register';
export const SIGNIN_API = API + '/users/login';

export const PROFILE_ME_API = API + '/profiles/me';

export const POST_MOVIE_API = API + '/movies/';
export const MOVIE_LIST_API = API + '/movies/';

export const LIKE_MOVIE_API = API + '/likes/like';
export const UNLIKE_MOVIE_API = API + '/likes/unlike';
export const CURRENT_USER_LIKED_MOVIES_API = API + '/likes/movies/my';
export const USER_LIKED_MOVIES_API = API + '/likes/movies/:userId';


export const PROFILE_USER_INFO = API + '/profiles/:userId';