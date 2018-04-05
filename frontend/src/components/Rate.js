import React from 'react';
import {inject, observer} from "mobx-react";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import StarRatingComponent from './StarRating/StarRatingComponent';

import SuccessMessage from './SuccessMessage';
import '../styles/Rates.css';

@inject(stores => {
  let { rates } = stores;
  return {
    rateMovie: rates.rateMovie,
    fetchCalculatedRate: rates.fetchCalculatedRate,
    fetchMyRateOfTheMovie: rates.fetchMyRateOfTheMovie,
  }
})@observer
class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRate: 10,
      calculatedRate: 10,
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.fetchMyRateOfTheMovie = this.fetchMyRateOfTheMovie.bind(this);
    this.fetchCalculatedRateOfTheMovie = this.fetchCalculatedRateOfTheMovie.bind(this);
  };

  async fetchMyRateOfTheMovie() {
    const { fetchMyRateOfTheMovie, movieId } = this.props;

    let myRate = await fetchMyRateOfTheMovie({
      movieId,
    });
    myRate = Number(myRate);
    this.setState({
      myRate,
    });
  }

  async fetchCalculatedRateOfTheMovie() {
    const { fetchCalculatedRate, movieId } = this.props;

    let calculatedRate = await fetchCalculatedRate({
      movieId,
    });
    this.setState({
      calculatedRate,
    });
  }

  componentWillMount() {
    this.fetchMyRateOfTheMovie();
    this.fetchCalculatedRateOfTheMovie();
  }


  async onStarClick(nextValue, prevValue, name) {
    const { rateMovie, movieId } = this.props;
    let rateNumber = Number(nextValue);

    this.setState({myRate: rateNumber});
    await rateMovie({
      movieId,
      rate: rateNumber,
    });
    await this.fetchCalculatedRateOfTheMovie();
  }

  render() {
    return (
      <div>
        <div className={'star'}>
          <div className="d-flex flex-row">
            <div className="rating p-2">
              <h4>My Rating: </h4>
            </div>
            <div className="p-8">
              <StarRatingComponent
                name="app2"
                starCount={10}
                value={this.state.myRate}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>
          </div>
        </div>
        <div>
          <h5>Spoiled Tomatillos Rating: {this.state.calculatedRate}</h5>
        </div>
      </div>
    );
  }
}

Rate.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Rate;
