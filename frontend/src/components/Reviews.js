import React from 'react';
import {inject, observer} from "mobx-react";
import { Link } from 'react-router-dom'

import SuccessMessage from './SuccessMessage';
import '../styles/Reviews.css';
import {USER_PROFILE_URI} from "../containers/routesContainer/uriConstants";
import {generateUserURI} from "../util";


@inject(stores => {
  let { reviews } = stores;
  return {
    reviewMovie: reviews.reviewMovie,
    response: reviews.response,
    setResponse: reviews.setResponse,
    reviewList: reviews.reviewList,
    fetchReviewList: reviews.fetchReviewList,
  }
})@observer
class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.handleReview = this.handleReview.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
  };


  componentWillMount() {
    const { fetchReviewList, movieId } = this.props;
    fetchReviewList({ movieId : movieId });
  }

  async handleReview(e) {
    e.preventDefault();
    const reviewContent = e.target.elements.reviewContent.value.trim();
    if (reviewContent) {
      const { reviewMovie, movieId } = this.props;
      e.target.elements.reviewContent.value = '';
      await reviewMovie(reviewContent, { movieId : movieId });
    }
  };

  renderResponse() {
    const { response, setResponse } = this.props;
    if (response && response.status === 200) {
      window.setTimeout(() => {
        setResponse(null);
      }, 1000);
      const successMessage = "Succeed to review movie!";
      return <SuccessMessage successMessage={ successMessage } />;
    }
    return <div/>;
  }

  renderReviews() {
    const { reviewList } = this.props;
    return <div className="boxed reviewSection">
      <ul className="reviews">{_.map(reviewList, (review) => {
        return <li className="review" key={review._id}>
          <Link to={generateUserURI(review.userId, USER_PROFILE_URI)}>{review.user.fullName}:</Link>   {review.content}</li>;
      })}</ul>
    </div>
  }

  render() {
    return (
      <div className="inside-boxed">
        <h4>Reviews</h4>
        {this.renderReviews()}
        {this.renderResponse()}
        <form className="input-group" onSubmit={this.handleReview}>
          <textarea className="form-control" aria-label="With textarea" name="reviewContent"/>
          <div className="input-group-prepend">
            <button className="post-btn btn-primary input-group-text btn" >Post</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Reviews;
