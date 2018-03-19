import {action, observable} from 'mobx'
import _ from 'lodash';

import {axios} from '../api/_axios';
import sessionStore from "./session";
import { generateUserURI } from '../util';
import { LIKE_MOVIE_API, UNLIKE_MOVIE_API, CURRENT_USER_LIKED_MOVIES_API, USER_LIKED_MOVIES_API } from '../api/constants';


class Likes {
    @observable currentUserLikedMovies = [];
    @observable errorMessage = null;

    @action
    async updateCurrentUserLikedMovies() {
        self.currentUserLikedMovies  = await self.getUserLikedMovies({
            userId: sessionStore.userInfo._id,
        });
    }
    
    @action
    async getUserLikedMovies({userId }) {
        const res = await axios.get(generateUserURI(userId, USER_LIKED_MOVIES_API));
        return res.data;
    }

    @action isMovieLikedByUser({ currentUserLikedMovies, imdbID }) {
        const movieFound = _.find(currentUserLikedMovies, (m) => {
            return m.imdbID === imdbID;
        });

        return !_.isNil(movieFound);
    }

    @action
    async likeMovie({ imdbID }) {
        await axios.post(LIKE_MOVIE_API, {
            imdbID,
        });
        await self.updateCurrentUserLikedMovies();
    }

    @action
    async unlikeMovie({ imdbID }) {
        await axios.post(UNLIKE_MOVIE_API, {
            imdbID,
        });
        await self.updateCurrentUserLikedMovies();
    }
}

const self = new Likes();

export default self;