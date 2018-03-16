'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { movieSchemaString } = require('../models/movie');
const { likeSchemaString } = require('../models/like');
const { userSchemaString } = require('../models/user');

const Movie = mongoose.model(movieSchemaString);
const Like = mongoose.model(likeSchemaString);
const User = mongoose.model(userSchemaString);

async function findUserWithId({userId}) {
  const user = await User.findOne({
    _id: userId,
  });

  if (_.isNil(user)) {
    throw new Error(`Cannot find user with _id: ${userId}.`);
  }
  return user;
}

function movieIdentityPredicate(movieId) {
  return (m) => {
    return m.toString() === movieId.toString();
  }
}

function findMovieInLikedList(movieList, movieId) {
  return _.find(movieList, movieIdentityPredicate(movieId));
}

async function findLikeOrCreateIfNotExist(userId) {
  let like = await Like.findOne({
    userId: userId,
  });

  if (_.isNil(like)) {
    // create new like
    like = new Like();
    like.userId = userId;
    await like.save();
  }

  return like;
}

async function like({ userId, imdbID }) {
  const user = await User.findOne({
    _id: userId,
  });

  if (_.isNil(user)) {
    throw new Error(`Cannot find user with _id: ${userId}.`);
  }

  const movie = await Movie.findOne({
    imdbID,
  });

  if (_.isNil(movie)) {
    throw new Error(`Cannot find movie with imdbID: ${imdbID}.`);
  }

  const like = await findLikeOrCreateIfNotExist(userId);

  if (_.isNil(findMovieInLikedList(like.likedMovies, movie._id))) {
    like.likedMovies.push(movie._id);
    await like.save();
  }

  return like;
}

async function unlike({ userId, imdbID }) {
  const user = await User.findOne({
    _id: userId,
  });

  if (_.isNil(user)) {
    throw new Error(`Cannot find user with _id: ${userId}.`);
  }

  const movie = await Movie.findOne({
    imdbID,
  });

  if (_.isNil(movie)) {
    throw new Error(`Cannot find movie with imdbID: ${imdbID}.`);
  }

  const like = await findLikeOrCreateIfNotExist(userId);

  if (!_.isNil(findMovieInLikedList(like.likedMovies, movie._id))) {
    like.likedMovies.remove(movie._id);
    await like.save();
  }

  return like;
}

async function findUserLikedMovies({ userId }) {
  const user = await findUserWithId({userId});

  const like = await findLikeOrCreateIfNotExist(user._id);
  const movieList = await Movie.findAllWithIdList(like.likedMovies);

  return movieList;
}

module.exports = {
  like,
  unlike,
  findUserLikedMovies,
};
