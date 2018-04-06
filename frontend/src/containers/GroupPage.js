import * as React from 'react';
import { inject, observer } from "mobx-react";

import GroupItem from '../components/GroupItem';
import '../styles/Movie.css';
import '../styles/Main.css'

@inject(stores => {
  let { groups } = stores;
  return {
    //groupList: groups.groupList.toJS(),
    //findGroupInList: groups.findGroupInList,
  }
})
@observer
class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    const { groupId } = this.props.match.params;
    this.state = {
      groupId,
      group: null,
    };
  }

  componentWillMount() {
    //this.fetchGroups();
  }

  componentWillReceiveProps(nextProps) {
    const { groupId } = nextProps.match.params;
    this.state = {
      groupId
    };
    //this.fetchUserProfile();
  }

  render() {
    const { groupId, group } = this.state;
    return (
      <div className="boxed">
        <div className="group">
          <GroupItem groupId={groupId} group={group}/>
        </div>
      </div>
    );
  };

}

export default GroupPage;
