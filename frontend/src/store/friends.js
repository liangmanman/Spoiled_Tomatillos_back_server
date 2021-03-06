import { action, observable } from 'mobx';
import async from 'async';
import _ from 'lodash';

import { axios } from '../api/_axios';
import { ADD_FRIEND_API, DELETE_FRIEND_API, IS_FRIEND_API, FRIENDS_OF_USER_API } from '../api/constants';
import sessionStore from "./session";


class Friends {


  @action async addFriend({ userId }) {
    let {_id} = sessionStore.userInfo;
    const res = await axios.post(ADD_FRIEND_API, {
      fromUserId: _id,
      toUserId: userId
    });
    return res.data;
  }

  @action async unFriend({ userId }) {
    let {_id} = sessionStore.userInfo;
    const res = await axios.delete(DELETE_FRIEND_API, {
      params: {
        fromUserId: _id,
        toUserId: userId
      }
    });
    return res.data;
  }

  @action async fetchFriendStatus({ userId }) {
    let {_id} = sessionStore.userInfo;
    const res = await axios.get(IS_FRIEND_API, {
      params: {
        fromUserId: _id,
        toUserId: userId,
      }
    });
    return !!res.data;
  }

  @action async fetchOtherStatus({ userId }) {
    let {_id} = sessionStore.userInfo;
    const res = await axios.get(IS_FRIEND_API, {
      params: {
        fromUserId: userId,
        toUserId: _id,
      }
    });
    return !!res.data;
  }

  @action async fetchFriends({ userId }) {
    const res = await axios.get(FRIENDS_OF_USER_API, {
      params: {
        userId
      }
    });
    const friends = await filter(res.data, async (f) => {
      const friendData = await axios.get(IS_FRIEND_API, {
        params: {
          fromUserId: f.toUserId,
          toUserId: f.fromUserId,
        }
      });
      return !_.isNull(friendData.data);
    });
    return friends;

  }
}

async function filter(arr, callback) {
  return (await Promise.all(arr.map(async item => {
    return (await callback(item)) ? item : undefined
  }))).filter(i=>i!==undefined)
}

const self = new Friends();

export default self;