'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');

const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const { incrementVersionNumberForSchema } = require('./utils');

const friendSchemaString = 'friend';
const { userSchemaString } = require('./user');

/**
 * User Schema
 */

const FriendSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.ObjectId,
    ref: userSchemaString,
    index: true,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.ObjectId,
    ref: userSchemaString,
    index: true,
    required: true,
  },
}, {
  timestamps: true,
});


const JoiFriendSchema = Joi.object().keys({
  fromUserId: Joi.string(),
  toUserId: Joi.string(),
});

/**
 * Virtuals
 */
FriendSchema.virtual('user', {
  ref: userSchemaString,
  localField: 'fromUserId',
  foreignField: '_id',
  justOne: true,
});

FriendSchema.virtual('toUser', {
  ref: userSchemaString,
  localField: 'toUserId',
  foreignField: '_id',
  justOne: true,
});

// create unique compound index, each user can only comment on the same movie once.
FriendSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// set virtuals on toObject or toJson.
FriendSchema.set('toObject', { virtuals: true });
FriendSchema.set('toJson', { virtuals: true });


/**
 * Validations
 */


/**
 * pre
 */
FriendSchema.pre('save', incrementVersionNumberForSchema);


/**
 * Statics
 */
FriendSchema.statics = {
  populateUserInfo: async function(queryResponse) {
    return queryResponse
      .populate({
        path: 'user',
        select: '-hashed_password -salt',
      })
      .populate({
        path: 'toUser',
        select: '-hashed_password -salt',
      });
  },
  isFriend: async function({ fromUserId, toUserId }) {
    let query = this.findOne({
      fromUserId,
      toUserId,
    });
    const rv = await this.populateUserInfo(query);
    return !(_.isNil(rv));
  },

  deleteFriend: async function({ fromUserId, toUserId }) {
    return await this.remove({
      fromUserId,
      toUserId,
    });
  },

  updateFriendOrCreateIfNotExist: async function({ fromUserId, toUserId }) {

      let friend = await this.findOne({
          fromUserId: fromUserId,
          toUserId: toUserId,
      });

      if (_.isNil(friend)) {
          // create new friend
          friend = new this();
          friend.fromUserId = fromUserId;
          friend.toUserId = toUserId;
          await friend.save();
      }

      return friend;

  },
};

mongoose.model(friendSchemaString, FriendSchema);


module.exports = {
  JoiFriendSchema,
  friendSchemaString,
};
