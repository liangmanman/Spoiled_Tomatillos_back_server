import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { SEARCH_USER_API } from '../api/constants';


class Users {
  @observable userList = [];

  @action setUserList(userList) {
    self.userList = userList;
  }

  @action async getUserBySearch(searchBy) {
    self.setUserList([]);
    const res = await axios.get(SEARCH_USER_API, {
      params: {
        searchBy: searchBy,
      }
    });
    self.setUserList(res.data);
    return res.data;
  }
}

const self = new Users();

export default self;