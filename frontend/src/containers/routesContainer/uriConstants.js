export const SEARCH_RESULT_URI = '/search';

export const SIGN_UP_URI = '/account/signUp';
export const SIGN_IN_URI = '/account/signIn';

// Movie Route URI
export const MOVIE_URI = '/movie';
export const MOVIE_LIST_URI = MOVIE_URI + '/list';
export const MOVIE_DETAIL_URI = MOVIE_URI + '/:movieId/detail';
export const MOVIE_LIKED_BY_URI = MOVIE_URI + '/:movieId/likedBy';

// Profile Route URI
export const USER_URI = '/user/:userId';
export const USER_LIKES_URI = USER_URI + '/likes';
export const USER_PROFILE_URI = USER_URI + '/profiles';

// Group Route URI
export const GROUP_URI = '/group';
export const GROUP_LIST_URI = GROUP_URI + '/list';
export const GROUP_DETAIL_URI = GROUP_URI + '/:groupId/detail';
