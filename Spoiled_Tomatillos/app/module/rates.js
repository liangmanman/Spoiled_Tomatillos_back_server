'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { rateSchemaString } = require('../models/rate');

const Rate = mongoose.model(rateSchemaString);

async function updateRateOrCreateIfNotExist({movieId, userId, rate}) {
    return await Rate.updateRateOrCreateIfNotExist({
        movieId,
        userId,
        rate,
    });
}

async function deleteRateByUserIdAndMovieId({ userId, movieId}) {
    return await Rate.deleteRateByUserIdAndMovieId({
        userId,
        movieId,
    });
}

async function findRateQuery({ userId, movieId }) {
    let rateList = [];
    if(_.isNil(userId) && _.isNil(movieId)) {
        rateList = await Rate.findAllRates();
    } else if (_.isNil(userId) && !_.isNil(movieId)) {
        // userId is null, movieId is not null
        rateList = await Rate.findRateByMovieId({
            movieId,
        });
    } else if (!_.isNil(userId) && _.isNil(movieId)) {
        // userId is not null, movieId is not null
        rateList = await Rate.findRateByUserId({
            userId,
        });
    } else if (!_.isNil(userId) && !_.isNil(movieId)){
        rateList = await Rate.findRateByUserIdAndMovieId({
            userId,
            movieId,
        });
    } else {
        throw new Error('Incorrect Query');
    }

    return rateList;
}

async function calculateRateOfMovie({ movieId }) {
    let rateList = await findRateQuery({ movieId });
    if (rateList.length === 0) {
        return 0;
    }

    let sum = _.sumBy(rateList, (rate) => {
        return rate.rate;
    });

    let calculatedRate = sum / rateList.length;
    return _.round(calculatedRate, 1);
}

module.exports = {
    updateRateOrCreateIfNotExist,
    deleteRateByUserIdAndMovieId,
    findRateQuery,
    calculateRateOfMovie,
};
