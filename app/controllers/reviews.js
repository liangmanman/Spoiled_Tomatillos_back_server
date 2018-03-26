'use strict';
const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const { JoiReviewSchema } = require('../models/review');
const {
  updateReviewOrCreateIfNotExist,
  findReviewQuery,
  deleteReviewByUserIdAndMovieId,
} = require('../module/reviews');
const { sendJoiValidationError } = require('../utils/joi');
const { validateUserHasPermission, sendPermissionError } = require('../utils/permission');

const authorization = require('../middlewares/authorization');

router.use(authorization.requiresLogin);

const JoiReviewQuerySchema = Joi.object().keys({
  userId: Joi.string(),
  movieId: Joi.string(),
});



router.post('/review', async function (req, res) {
  const fieldList = ['userId', 'movieId', 'content'];

  const newReviewBody = _.pick(req.body, fieldList);

  const joiResult  = Joi.validate(newReviewBody, JoiReviewSchema, {
    presence: 'required',
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  const userInfo = req.decodedToken;

  const hasPermission = validateUserHasPermission({
    userInfo,
    userId: newReviewBody.userId,
  });

  if (!hasPermission) {
    return sendPermissionError({
      userId: newReviewBody.userId,
      res,
    })
  }

  try {
    await updateReviewOrCreateIfNotExist(newReviewBody);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});


router.delete('/review', async function (req, res) {
  const fieldList = ['userId', 'movieId'];

  const newReviewQuery = _.pick(req.query, fieldList);

  const joiResult  = Joi.validate(newReviewQuery, JoiReviewQuerySchema, {
    presence: 'required',
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }
  const userInfo = req.decodedToken;

  const hasPermission = validateUserHasPermission({
    userInfo,
    userId: newReviewQuery.userId,
  });

  if (!hasPermission) {
    return sendPermissionError({
      userId: newReviewQuery.userId,
      res,
    })
  }

  try {
    await deleteReviewByUserIdAndMovieId(newReviewQuery);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.get('/', async function(req, res) {
  const fieldList = ['userId', 'movieId'];

  const newReviewQuery = _.pick(req.query, fieldList);

  const joiResult  = Joi.validate(newReviewQuery, JoiReviewQuerySchema, {
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  try {
    const reviewList = await findReviewQuery(newReviewQuery);
    res.json(reviewList);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

module.exports = router;
