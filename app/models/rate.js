'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');


const { incrementVersionNumberForSchema } = require('./utils');

const { userSchemaString } = require('./user');
const { movieSchemaString } = require('./movie');

const Schema = mongoose.Schema;

const rateSchemaString = 'rate';


/**
 * Rate Schema
 */

const RateSchema = new Schema({
  movieId: {
    type: String,
    ref: movieSchemaString,
    index: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: userSchemaString,
    index: true,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// virtual
RateSchema.virtual('movie', {
  ref: movieSchemaString,
  localField: 'movieId',
  foreignField: 'imdbID',
  justOne: true,
});

RateSchema.virtual('user', {
  ref: userSchemaString,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// create unique compound index, each user can only comment on the same movie once.
RateSchema.index({ movieId: 1, userId: 1 }, { unique: true });

// set virtuals on toObject or toJson.
RateSchema.set('toObject', { virtuals: true });
RateSchema.set('toJson', { virtuals: true });


const JoiRateSchema = Joi.object().keys({
  userId: Joi.string(),
  movieId: Joi.string(),
  rate: Joi.number().integer().min(0).max(10),
});

/**
 * Validations
 */

RateSchema.path('rate').validate(function (rate) {
  // check unique movie list
  return rate >= 0 && rate <= 10;
}, 'rate must be in the rage of [0,10]');

/**
 * Statics
 */

RateSchema.statics = {
  filterNullRate(rateList) {
    return _.filter(rateList, (rate) =>{
      return !_.isNil(rate.userId) && !_.isNil(rate.movieId);
    })
  },
  populateMoveAndUser: async function(queryResponse) {
    const rateList =  await queryResponse
      .populate({
        path: 'user',
        select: '-hashed_password -salt',
      })
      .populate('movie');
    return this.filterNullRate(rateList);
  },
  findRateByUserIdAndMovieId: async function({ userId, movieId }) {
    const queryResponse = this.find({
      userId,
      movieId,
    });
    return await this.populateMoveAndUser(queryResponse);
  },
  findRateByUserId: async function({ userId }) {
    const queryResponse = this.find({
      userId,
    });
    return await this.populateMoveAndUser(queryResponse);
  },
  findRateByMovieId: async function({ movieId }) {
    const queryResponse = this.find({
      movieId,
    });
    return await this.populateMoveAndUser(queryResponse);
  },
  findAllRates: async function() {
    const queryResponse = this.find();
    return await this.populateMoveAndUser(queryResponse);
  },
  updateRateOrCreateIfNotExist: async function({ movieId, userId, rate}) {
    return await this.findOneAndUpdate({
      movieId,
      userId,
    }, {
      movieId,
      userId,
      rate,
    }, {
      new: true,
      upsert: true,
    })
  },
  deleteRateByUserIdAndMovieId: async function({ movieId, userId }) {
    return await this.remove({
      movieId,
      userId,
    });
  },
};


/**
 * pre
 */

RateSchema.pre('save', incrementVersionNumberForSchema);

mongoose.model(rateSchemaString, RateSchema);

module.exports = {
  JoiRateSchema,
  rateSchemaString,
};
