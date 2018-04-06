import * as React from 'react';
import _ from 'lodash';
import GroupItem from '../components/GroupItem';
import {inject, observer} from "mobx-react";
import TiPlus from 'react-icons/lib/ti/plus';

import stylesMain from '../styles/Main.css'


@inject(stores => {
  let { groups } = stores;
  return {
    fetchGroupsByUserId: groups.fetchGroupsByUserId,
    groupList: groups.groupList.toJS(),
    createGroup: groups.createGroup,
  }
})
@observer
class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.renderGroupInfoList = this.renderGroupInfoList.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  componentWillMount() {
    const { fetchGroupsByUserId } = this.props;
    fetchGroupsByUserId();
  }

  renderGroupInfoList() {
    const { groupList } = this.props;

    return _.map(groupList, (group) => {
      return <GroupItem groupId={group._id} key={group._id}/>
    });
  }
  async createGroup() {
    let { createGroup } = this.props;
    await createGroup();
  }

  render() {
    return (
      <div className="boxed">
        <div>
          <button className="groupButton" onClick={this.createGroup}>
            <TiPlus size={14}/>
          </button>
          <h2>Group List</h2>
        </div>
        <div className={"groups"}>
          {this.renderGroupInfoList()}
        </div>
      </div>
    );
  }
}

export default GroupList;
