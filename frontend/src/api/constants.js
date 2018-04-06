const API = '/api';

export const SIGNUP_API = API + '/users/register';
export const SIGNIN_API = API + '/users/login';
export const SEARCH_USER_API = API + '/users/search';

export const PROFILE_ME_API = API + '/profiles/me';

export const POST_MOVIE_API = API + '/movies/';
export const MOVIE_LIST_API = API + '/movies/';

export const LIKE_MOVIE_API = API + '/likes/like';
export const UNLIKE_MOVIE_API = API + '/likes/unlike';
export const CURRENT_USER_LIKED_MOVIES_API = API + '/likes/movies/my';
export const MOVIES_LIKED_BY_USERID_API = API + '/likes/movies/:userId';
export const USERS_LIKE_MOVIEID_API = API + '/likes/users/:movieId';
export const USERS_LENGTH_LIKE_MOVIEID_API = API + '/likes/users/:movieId/length';

export const REVIEW_MOVIE_API = API + '/reviews/review';
export const REVIEWS_OF_MOVIE_API = API + '/reviews/?movieId=';

export const RATE_MOVIE_API = API + '/rates/rate';
export const RATE_OF_MOVIE_API = API + '/rates';
export const RATE_CALCULATE_RAGE_OF_MOVIE_API = API + '/rates/calculate';

export const ADD_FRIEND_API = API + '/friends';
export const DELETE_FRIEND_API = API + '/friends/unFriend';
export const IS_FRIEND_API = API + '/friends/isFriend?';

export const CREATE_GROUP_API = API + '/groups/create';
export const GROUPS_OF_USER_API = API + '/groups/groups';
export const LEAVE_GROUP_API = API + '/groups/leave';
export const ADD_USERS_TO_GROUP_API = API + '/groups/add';
export const REMOVE_USERS_FROM_GROUP_API = API + '/groups/remove';

export const PROFILE_USER_INFO = API + '/profiles/:userId';