import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { ADD_FRIEND_API, DELETE_FRIEND_API, IS_FRIEND_API, } from '../api/constants';
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
    console.log(!!res.data);
    return !!res.data;
  }

}

const self = new Friends();

export default self;