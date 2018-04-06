import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import GroupList from '../GroupList';
import GroupPage from '../GroupPage';
import { GROUP_LIST_URI, GROUP_DETAIL_URI } from "./uriConstants";

@observer
class GroupRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route key={GROUP_LIST_URI}
               path={GROUP_LIST_URI}
               component={GroupList}/>
        <Route key={GROUP_DETAIL_URI}
               path={GROUP_DETAIL_URI}
               component={GroupPage}/>
        <Route key="any" path="*" component={GroupList}/>
      </Switch>
    );
  }
}



export default withRouter(GroupRoute);
