import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { REVIEWS_OF_MOVIE_API, REVIEW_MOVIE_API} from '../api/constants';
import sessionStore from "./session";


class Reviews {
  @observable response = null;
  @observable reviewList = [];

  @action setResponse(response) {
    self.response = response;
  }

  @action setReviewList(reviewList) {
    self.reviewList = reviewList;
  }

  @action async reviewMovie(content, {movieId}) {
    let { _id } = sessionStore.userInfo;
    const res = await axios.post(REVIEW_MOVIE_API, {
      content,
      movieId,
      userId: _id
    });
    await self.fetchReviewList({movieId});
    self.setResponse(res);
  }

  @action async fetchReviewList({movieId}) {
    const res = await axios.get(REVIEWS_OF_MOVIE_API+movieId);
    self.setReviewList(res.data);
  }


}

const self = new Reviews();

export default self;