'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { friendSchemaString } = require('../models/friend');
const { userSchemaString } = require('../models/user');

const Friend = mongoose.model(friendSchemaString);
const User = mongoose.model(userSchemaString);


async function addFriend({ fromUserId, toUserId }) {
    const f_user = await User.findOne({
        _id: fromUserId,
    });

    const t_user = await User.findOne({
        _id:toUserId,
    });

    if (_.isNil(f_user) || _.isNil(t_user)) {
        throw new Error(`Cannot find user with _id: ${userId}.`);
    }

  return await Friend.updateFriendOrCreateIfNotExist({
    fromUserId,
    toUserId,
  });
}

async function isFriend({ fromUserId, toUserId }) {
  return await Friend.isFriend({ fromUserId, toUserId });
}

async function deleteFriend({ fromUserId, toUserId }) {
  return await Friend.deleteFriend({ fromUserId, toUserId });
}

module.exports = {
  addFriend,
    isFriend,
  deleteFriend,
};
