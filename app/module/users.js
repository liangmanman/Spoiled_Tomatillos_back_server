'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');

const { userSchemaString } = require('../models/user');
const User = mongoose.model(userSchemaString);

/**
 * private helper method for verifying token
 * @param token
 * @returns {Promise}
 */
async function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        reject(err);
      }

      resolve(decoded);
    });
  });
}

function generateJwtTokenForUser({ userId }) {
  return jwt.sign({ userId }, config.secret, {
    expiresIn: 60 * 60 * 24 * 7, // expires in a week
  });
}

async function verifyMe({ _id }, token) {
  try {
    const decodedToken = await decodeToken(token);
    if (_id === decodedToken.userId) {
      return {
        auth: true,
      };
    } else {
      return {
        auth: false,
        message: "User Id does not match the token User Id",
      }
    }
  } catch(error) {
    return {
      auth: false,
      message: error,
    }
  }
}

async function getUser({ userId }) {
  return await User.getUserWithoutSensitiveInformation({ userId });
}

async function findUsersBySearch({ searchBy }) {
  const userList = await User.findUsersBySearch({ searchBy });
  return userList;
}

module.exports = {
  decodeToken,
  generateJwtTokenForUser,
  verifyMe,
  getUser,
  findUsersBySearch,
};
