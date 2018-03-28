import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { ADD_FRIEND_API, } from '../api/constants';
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

}

const self = new Friends();

export default self;