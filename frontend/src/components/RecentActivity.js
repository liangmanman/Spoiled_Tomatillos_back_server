
import React, { Component } from 'react';
import _ from 'lodash';
import {inject, observer} from "mobx-react";

@inject(stores => {
  let { reviews, session } = stores;
  return {
    fetchUserReviewList: reviews.fetchUserReviewList,
    reviewList: reviews.reviewList,
    getUserInfo: session.getUserInfo,
    userInfo: session.userInfo
  }
})
@observer
class RecentActivity extends React.Component {
  constructor(props) {
    super(props);
    this.getRecentReviews = this.getRecentReviews.bind(this);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentWillMount() {
   this.getRecentReviews();
  }

  getRecentReviews() {
    const {fetchUserReviewList, getUserInfo} = this.props;
    getUserInfo();
    const { userInfo } = this.props;
    fetchUserReviewList({userId: userInfo._id});
  }

  renderRecentReviews() {
    const { reviewList } = this.props;
    console.log(reviewList);

    return _.map(reviewList, (review) => {
      return <p>{review.content}</p>;
    });
  }

  render() {
    return (
        <div className="inside-boxed">
          <h4>Your Recent Activity:</h4>
          {this.renderRecentReviews()}
        </div>
    )
  }
}

export default RecentActivity;