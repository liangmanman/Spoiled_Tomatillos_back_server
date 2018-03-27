import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { RATE_OF_MOVIE_API, RATE_MOVIE_API, RATE_CALCULATE_RAGE_OF_MOVIE_API } from '../api/constants';
import sessionStore from "./session";


class Rates {
    @action async rateMovie({ movieId, rate }) {
        let { _id } = sessionStore.userInfo;
        const res = await axios.post(RATE_MOVIE_API, {
            rate,
            movieId,
            userId: _id
        });
        return res.data;
    }

    @action async fetchCalculatedRate({ movieId }) {
        const res = await axios.get(RATE_CALCULATE_RAGE_OF_MOVIE_API,
            {
                params: {
                    movieId
                }
            },
        );
        return Number(res.data);
    }

    @action async fetchMyRateOfTheMovie({ movieId }) {
        let { _id } = sessionStore.userInfo;
        const res = await axios.get(RATE_OF_MOVIE_API,
            {
                params: {
                    movieId,
                    userId: _id,
                }
            },
        );
        const rateScoreList = res.data;
        if (rateScoreList.length === 0) {
            return 0;
        } else {
            return Number(rateScoreList[0].rate);
        }
    }


}

const self = new Rates();

export default self;