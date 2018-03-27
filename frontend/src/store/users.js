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
    const res = await axios.post(SEARCH_USER_API, {
      searchBy: searchBy
    });
    self.setUserList(res.data);
  }
}

const self = new Users();

export default self;