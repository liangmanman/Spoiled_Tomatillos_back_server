'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');

const usersModule = require('../module/users');
const { sendJoiValidationError } = require('../utils/joi');
const { JoiUserSchema } = require('../models/user');
const JoiUserSearchSchema = Joi.object().keys({
  searchBy: Joi.string(),
});

const router = express.Router();

// Create API group routes
// register new user
router.post('/register', async function(req, res) {
  const fieldList = ['email', 'password', 'fullName'];
  const newUserFromBody = _.pick(req.body, fieldList);

  const joiResult  = Joi.validate(newUserFromBody, JoiUserSchema, {
    presence: 'required',
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  const newUser = new User({
    email: newUserFromBody.email,
    password: newUserFromBody.password,
    fullName: newUserFromBody.fullName,
  });

  // Attempt to save the user
  try {
    const savedUser = await newUser.save();
    // create a token
    const token = usersModule.generateJwtTokenForUser({
      userId: savedUser._id,
    });

    res.json({
      success: true,
      message: 'Successfully created new user.',
      token: token,
      auth: true,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.get('/isLoggedIn', async function(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  try {
    await usersModule.getUser(token);
    return res.status(200).send({ auth: true});
  } catch (error) {
    return res.status(500).send({ auth: false, message: error.message });
  }
});

router.post('/login', async function(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('No user found.');
    }
    const passwordIsValid = user.authenticate(req.body.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = usersModule.generateJwtTokenForUser({
      userId: user._id,
    });
    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    return res.status(500).send('Error on the server.');
  }
});

router.get('/search', async function (req, res) {
  const fieldList = ['searchBy'];
  const searchQuery =  _.pick(req.query, fieldList);

  const joiResult  = Joi.validate(searchQuery, JoiUserSearchSchema, {
    presence: 'required',
    abortEarly: false,
  });
  const joiError = joiResult.error;

  if (!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res);
  }

  try {
    const userList = await usersModule.findUsersBySearch({
      searchBy: searchQuery.searchBy,
    });
    res.json(userList);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
