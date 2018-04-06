import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import TiTimes from 'react-icons/lib/ti/times';

@inject((stores) => {
  const { groups, session } = stores;

  return {
    removeMembers: groups.removeMembers,
    leaveGroup: groups.leaveGroup,
    userInfo: session.userInfo,
  }
})
@observer
class RemoveMemberButton extends React.Component {
  constructor(props) {
    super(props);
    this.removeMembers = this.removeMembers.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
  }

  async removeMembers() {
    let { removeMembers, userId, groupId } = this.props;
    await removeMembers({
      users: [userId],
      groupId,
    });
  };

  async leaveGroup() {
    const { leaveGroup, groupId } = this.props;
    await leaveGroup({groupId});
  }

  renderRemoveButton() {
    let { userId, userInfo, groupAdminId } = this.props;
    if (groupAdminId === userId) {
      return <div></div>
    } else if (userInfo._id === userId) {
      return <button onClick={this.leaveGroup}>
        leave
      </button>;
    }
    return <button onClick={this.removeMembers}>
      <TiTimes size={14}/>
    </button>;
  }

  render() {
    return <div className="groupButton">
      {this.renderRemoveButton()}
    </div>
  }

}

RemoveMemberButton.propTypes = {
  groupAdminId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default RemoveMemberButton;