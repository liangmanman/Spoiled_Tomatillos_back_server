'use strict';

/**
 * Module dependencies.
 */
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
  localField: 'user',
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

  getFriendStatus: async function({ fromUserId, toUserId }) {
    return await this.findOne({
      fromUserId,
      toUserId,
    })
  },

  deleteFriend: async function({ fromUserId, toUserId }) {
    return await this.remove({
      fromUserId,
      toUserId,
    });
  },

  updateFriendOrCreateIfNotExist: async function({ fromUserId, toUserId }) {
    return await this.findOneAndUpdate({
      fromUserId,
      toUserId,
    }, {
      fromUserId,
      toUserId,
    }, {
      new: true,
      upsert: true,
    })
  },


};

mongoose.model(friendSchemaString, FriendSchema);


module.exports = {
  JoiFriendSchema,
  friendSchemaString,
};
