import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import {
  CREATE_GROUP_API,
  GROUPS_OF_USER_API,
  ADD_USERS_TO_GROUP_API,
  REMOVE_USERS_FROM_GROUP_API,
  LEAVE_GROUP_API,
} from '../api/constants';
import sessionStore from "./session";


class Groups {

  @observable groupList = [];

  @action setGroupList(groupList) {
    self.groupList = groupList;
  }

  @action async createGroup() {
    let {_id} = sessionStore.userInfo;
    await axios.post(CREATE_GROUP_API, {
      users : [_id],
      userId: _id,
    });
    await self.fetchGroupsByUserId();
  }

  @action async fetchGroupsByUserId() {
    let {_id} = sessionStore.userInfo;
    const res = await axios.get(GROUPS_OF_USER_API, {
      params: {
        userId: _id,
      }
    });
    self.setGroupList(res.data);
  }

  @action async fetchGroupById({ groupId }) {
    let {_id} = sessionStore.userInfo;
    const res = await axios.get(GROUPS_OF_USER_API, {
      params: {
        userId: _id,
        _id: groupId,
      }
    });
    return res.data;
  }

  @action async addMembers({ groupId, users }) {
    let {_id} = sessionStore.userInfo;
    await axios.post(ADD_USERS_TO_GROUP_API, {
      users,
      _id: groupId,
      userId: _id,
    });
    await self.fetchGroupsByUserId();
  }

  @action async removeMembers({ groupId, users }) {
    let {_id} = sessionStore.userInfo;
    await axios.post(REMOVE_USERS_FROM_GROUP_API, {
      users,
      _id: groupId,
      userId: _id,
    });
    await self.fetchGroupsByUserId();
  }

  @action async leaveGroup({ groupId }) {
    let {_id} = sessionStore.userInfo;
    await axios.post(LEAVE_GROUP_API, {
      _id: groupId,
      userId: _id,
    });
    await self.fetchGroupsByUserId();
  }

  @action getGroupFromGroupList({ groupList, groupId }) {
    const group = _.find(groupList, (group) => {
      return group._id === groupId;
    });
    return group ? group : null;
  }
}

const self = new Groups();

export default self;