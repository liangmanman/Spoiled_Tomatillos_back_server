'use strict';
const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const { like, unlike, findMoviesLikedByUserId, findUsersLikeMovieId } = require('../module/likes');
const { JoiLikeSchema } = require('../models/like');
const { sendJoiValidationError } = require('../utils/joi');

const authorization = require('../middlewares/authorization');

router.use(authorization.requiresLogin);

router.post('/like', async function (req, res) {
  const fieldList = ['imdbID'];
  const newLikeBody = _.pick(req.body, fieldList);

  const joiResult  = Joi.validate(newLikeBody, JoiLikeSchema, {
    presence: 'required',
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  const userInfo = req.decodedToken;

  try {
    // if not exist, don't create a new one.
    await like({
      userId: userInfo.userId,
      imdbID: newLikeBody.imdbID,
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});


router.post('/unlike', async function (req, res) {
  const fieldList = ['imdbID'];
  const newLikeBody = _.pick(req.body, fieldList);

  const joiResult  = Joi.validate(newLikeBody, JoiLikeSchema, {
    presence: 'required',
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  const userInfo = req.decodedToken;

  try {
    // if not exist, don't create a new one.
    await unlike({
      userId: userInfo.userId,
      imdbID: newLikeBody.imdbID,
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.get('/movies/my', async function (req, res) {
  const userInfo = req.decodedToken;

  try {
    // if not exist, don't create a new one.
    const movieList = await findMoviesLikedByUserId({
      userId: userInfo.userId,
    });
    res.json(movieList);

  } catch (error) {
    res.status(500).send(error.message);
  }

});


router.get('/movies/:userId', async function (req, res) {

  const userId = req.params.userId;

  try {
    // if not exist, don't create a new one.
    const movieList = await findMoviesLikedByUserId({
      userId: userId,
    });
    res.json(movieList);

  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.get('/movies/:userId/length', async function (req, res) {

  const userId = req.params.userId;

  try {
    const response = await findMoviesLikedByUserId({
      userId: userId,
    });
    res.json({'length': response.length});
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.get('/users/:movieId', async function (req, res) {

  const movieId = req.params.movieId;

  try {
    // if not exist, don't create a new one.
    const userList = await findUsersLikeMovieId({
      movieId: movieId,
    });
    res.json(userList);

  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.get('/users/:movieId/length', async function (req, res) {

  const imdbID = req.params.movieId;

  try {
    // if not exist, don't create a new one.
    const userList = await findUsersLikeMovieId({
      imdbID: imdbID,
    });
    res.json(res.json({'length': userList.length}));

  } catch (error) {
    res.status(500).send(error.message);
  }

});

module.exports = router;
