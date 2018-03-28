'use strict';
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');

const router = express.Router();

const friendsModule = require('../module/friends');
const usersModule = require('../module/users');
const { sendJoiValidationError } = require('../utils/joi');
const { JoiFriendSchema } = require('../models/friend');
const { validateUserHasPermission, sendPermissionError } = require('../utils/permission');



const authorization = require('../middlewares/authorization');
router.use(authorization.requiresLogin);

// Create API group routes
// add friend
router.post('/', async function (req, res) {
  const fieldList = ['fromUserId', 'toUserId'];
  const newFriendBody = _.pick(req.body, fieldList);
  const joiResult  = Joi.validate(newFriendBody, JoiFriendSchema, {
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
    userId: newFriendBody.fromUserId,
  });
  if (!hasPermission) {
    return sendPermissionError({
      userId: newFriendBody.fromUserId,
      res,
    })
  }

  const { toUserId } = newFriendBody;
  try {
    usersModule.getUser({
      userId: toUserId
    });
  } catch (error) {
    return res.status(500).send({ message: 'No exit user' });
  }

  try {
    await friendsModule.updateFriendOrCreateIfNotExist(newFriendBody);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.delete('/unFriend', async function (req, res) {
  const fieldList = ['fromUserId', 'toUserId'];
  const newFriendQuery = _.pick(req.query, fieldList);

  const joiResult  = Joi.validate(newFriendQuery, JoiFriendSchema, {
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
    userId: newFriendQuery.fromUserId,
  });

  if (!hasPermission) {
    return sendPermissionError({
      userId: newFriendQuery.fromUserId,
      res,
    })
  }

  try {
    await friendsModule.deleteFriend(newFriendQuery);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

// isFriend?
router.get('/isFriend?', async function (req, res) {
  const fieldList = ['fromUserId', 'toUserId'];
  const isFriendQuery = _.pick(req.query, fieldList);

  const joiResult  = Joi.validate(isFriendQuery, JoiFriendSchema, {
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  try {
    const response = await friendsModule.determineIsFriendOfUser(isFriendQuery);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
