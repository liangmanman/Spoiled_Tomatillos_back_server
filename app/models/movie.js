'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Joi = require('joi');

const { incrementVersionNumberForQuery,
  incrementVersionNumberForSchema } = require('./utils');

const Schema = mongoose.Schema;

const movieSchemaString = 'Movie';


/**
 * Movie Schema
 */

const MovieSchema = new Schema({
  title: { type: String, required: true },
  imdbID: { type: String, required: true, unique: true, index: true },
  posterImgPath: { type: String, required: true },
  releaseYear: { type: String, required: true },
  briefDescription: { type: String, required: true },
}, {
  timestamps: true,
});

const JoiMovieSchema = Joi.object().keys({
  title: Joi.string(),
  imdbID: Joi.string(),
  posterImgPath: Joi.string(),
  releaseYear: Joi.string(),
  briefDescription: Joi.string(),
});

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally
MovieSchema.path('title').validate(function (title) {
  return title.length;
}, 'Title cannot be blank');

MovieSchema.path('imdbID').validate(function (imdbID) {
  return imdbID.length;
}, 'imdbID cannot be blank');

MovieSchema.path('posterImgPath').validate(function (posterImgPath) {
  return posterImgPath.length;
}, 'posterImgPath cannot be blank');

MovieSchema.path('releaseYear').validate(function (releaseYear) {
  return releaseYear.length;
}, 'releaseYear cannot be blank');

MovieSchema.path('briefDescription').validate(function (briefDescription) {
  return briefDescription.length;
}, 'briefDescription cannot be blank');



/**
 * Statics
 */

MovieSchema.statics = {
  // findAllWithIdList: async function(idList) {
  //   return await this.find({
  //     _id: {
  //       $in: idList,
  //     },
  //   });
  // },
};

/**
 * pre
 */

MovieSchema.pre('save', incrementVersionNumberForSchema);

MovieSchema.pre('findOneAndUpdate', incrementVersionNumberForQuery);

// MovieSchema.pre('update', incrementVersionNumberForQuery);

mongoose.model(movieSchemaString, MovieSchema);

module.exports = {
  JoiMovieSchema,
  movieSchemaString,
};
