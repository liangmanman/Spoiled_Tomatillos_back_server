import React, { Component, } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TiTrash from 'react-icons/lib/ti/trash';

import { USER_PROFILE_URI } from '../containers/routesContainer/uriConstants';
import { generateUserURI } from '../util';
import '../styles/GroupItem.css';
import '../styles/Main.css';
import RemoveMemberButton from './Button/RemoveMemberButton';
import SelectUsers from './Selector/SelectUsers';


@inject(stores => {
  let { groups, session, profiles, } = stores;
  return {
    groupList: groups.groupList.toJS(),
    getGroupFromGroupList: groups.getGroupFromGroupList,
    leaveGroup: groups.leaveGroup,
    userInfo: session.userInfo,
    fetchUserProfile: profiles.fetchUserProfile,
  }
})@observer
class GroupItem extends Component {
  constructor(props) {
    super(props);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  async deleteGroup() {
    const { leaveGroup, groupId } = this.props;
    await leaveGroup({groupId});
  }

  renderGroupMembers(groupInfo) {
    const { userInfo } = this.props;
    return _.map(groupInfo.users, (user) => {
      const { groupAdminId, _id } = groupInfo;
      const currentUserId= userInfo._id;
      const groupMemberId = user._id;
      if (groupAdminId === currentUserId || currentUserId === groupMemberId) {
        return <div key={groupMemberId} className="memberRow">
          <RemoveMemberButton
            className="button"
            groupId={_id}
            userId={groupMemberId}
            groupAdminId={groupAdminId}
          />
          <Link to={generateUserURI(user._id, USER_PROFILE_URI)}>{user.fullName}</Link>
        </div>
      }
      return <div key={user._id}>
        <Link to={generateUserURI(user._id, USER_PROFILE_URI)}>{user.fullName}</Link>
      </div>
    })
  }

  renderDeleteGroupOption(groupInfo) {
    const { userInfo } = this.props;
    if (groupInfo.groupAdminId === userInfo._id) {
      return <div className="groupButton">
        <button onClick={this.deleteGroup}>
          <TiTrash size={14}/>
        </button>
      </div>
    }
    return <div></div>
  }

  render() {
    const { getGroupFromGroupList, groupId, groupList } = this.props;
    const groupInfo = getGroupFromGroupList({groupList, groupId});
    return (
      <div className="col-md-6 col-6 groupItem">
        <div className="groupCard">
          <div className="groupHeader">
            {groupInfo._id}
            {this.renderDeleteGroupOption(groupInfo)}
          </div>
          <div className="groupMembers">
            {this.renderGroupMembers(groupInfo)}
          </div>
          <div className="groupFooter">
            <SelectUsers groupId={groupId}/>
          </div>
        </div>
      </div>
    );
  }
}

GroupItem.propTypes = {
  groupId: PropTypes.string.isRequired,
};

export default GroupItem;

