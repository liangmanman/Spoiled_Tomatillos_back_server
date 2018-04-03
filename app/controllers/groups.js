'use strict';
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');

const router = express.Router();

const groupsModule = require('../module/groups');
const { sendJoiValidationError } = require('../utils/joi');
const { JoiGroupSchema } = require('../models/group');
const JoiGetGroupSchema = Joi.object().keys({
  userId: Joi.string(),
  _id: Joi.string(),
});
const JoiCreateGroupSchema = Joi.object().keys({
  userId: Joi.string(),
  users: Joi.array().items(Joi.string()),
});
const { validateUserHasPermission, sendPermissionError } = require('../utils/permission');

const authorization = require('../middlewares/authorization');
router.use(authorization.requiresLogin);

// Create API group routes
// create group
router.post('/create', async function (req, res) {
  const fieldList = ['users', 'userId'];
  const newGroupBody = _.pick(req.body, fieldList);
  const joiResult  = Joi.validate(newGroupBody, JoiCreateGroupSchema, {
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
    userId: newGroupBody.userId,
  });
  if (!hasPermission) {
    return sendPermissionError({
      userId: newGroupBody.userId,
      res,
    })
  }
  try {
    await groupsModule.createGroup(newGroupBody);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

router.post('/remove', async function (req, res) {
  const fieldList = ['users', 'userId', '_id'];
  const newGroupBody = _.pick(req.body, fieldList);
  const joiResult  = Joi.validate(newGroupBody, JoiGroupSchema, {
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
    userId: newGroupBody.userId,
  });
  if (!hasPermission) {
    return sendPermissionError({
      userId: newGroupBody.userId,
      res,
    })
  }
  try {
    await groupsModule.removeMembers(newGroupBody);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/add', async function (req, res) {
  const fieldList = ['users', 'userId', '_id'];
  const newGroupBody = _.pick(req.body, fieldList);
  const joiResult  = Joi.validate(newGroupBody, JoiGroupSchema, {
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
    userId: newGroupBody.userId,
  });
  if (!hasPermission) {
    return sendPermissionError({
      userId: newGroupBody.userId,
      res,
    })
  }
  try {
    await groupsModule.addMembers(newGroupBody);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/groups', async function (req, res) {
  const fieldList = ['_id', 'userId'];
  const getGroupsQuery = _.pick(req.query, fieldList);

  const joiResult  = Joi.validate(getGroupsQuery, JoiGetGroupSchema, {
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }
  const userInfo = req.decodedToken;
  const hasPermission = validateUserHasPermission({
    userInfo,
    userId: getGroupsQuery.userId,
  });
  if (!hasPermission) {
    return sendPermissionError({
      userId: getGroupsQuery.userId,
      res,
    })
  }
  try {
    const groupList = await groupsModule.findGroupQuery(getGroupsQuery);
    res.json(groupList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/leave', async function (req, res) {
  const fieldList = ['userId', '_id'];
  const newGroupBody = _.pick(req.body, fieldList);
  const joiResult  = Joi.validate(newGroupBody, JoiGetGroupSchema, {
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
    userId: newGroupBody.userId,
  });
  if (!hasPermission) {
    return sendPermissionError({
      userId: newGroupBody.userId,
      res,
    })
  }
  try {
    await groupsModule.leaveGroup(newGroupBody);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
