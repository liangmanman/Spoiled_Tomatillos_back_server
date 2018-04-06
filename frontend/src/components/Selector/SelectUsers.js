import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import TiPlus from 'react-icons/lib/ti/plus';

import {SEARCH_USER_API} from '../../api/constants';
import {axios} from '../../api/_axios';
import '../../styles/GroupItem.css';
import 'react-select/dist/react-select.css';
import {generateUserURI, generateNewTabURI} from "../../util";
import {USER_PROFILE_URI} from "../../containers/routesContainer/uriConstants";
import {inject, observer} from "mobx-react/index";


@inject(stores => {
  let { groups } = stores;
  return {
    addMembers: groups.addMembers,
  }
})@observer
class SelectUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      backspaceRemoves: true,
      multi: true,
      creatable: false,
      isLoadingExternally: true,
      value: null,
    };
    this.onChange = this.onChange.bind(this);
    this.addMembers = this.addMembers.bind(this);
  }
  onChange (value) {
    this.setState({
      value: value,
    });
  }

  getUsers (input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return axios.get(SEARCH_USER_API, {
      params: {
        searchBy: input.trim(),
      }
    }).then((response) => {
      return { options: response.data };
    });
  }

  gotoUser (value, event) {
    window.open(generateNewTabURI(generateUserURI(value._id, USER_PROFILE_URI)));
  }

  async addMembers() {
    const { addMembers, groupId } = this.props;
    let users = this.state.value;
    users = _.map(users, '_id');
    await addMembers({users, groupId});

  }
  render () {
    const AsyncComponent = Select.Async;
    return (
      <div className="outer-selector">
        <button className="group-add-button" onClick={this.addMembers}>
          <TiPlus size={14}/>
        </button>
        <AsyncComponent
          className="Selector"
          multi={this.state.multi}
          value={this.state.value}
          onChange={this.onChange}
          onValueClick={this.gotoUser}
          valueKey="_id" labelKey="fullName"
          loadOptions={this.getUsers}
          backspaceRemoves={this.state.backspaceRemoves}
          isLoading={this.state.isLoadingExternally}
        />
      </div>
    );
  }
}

SelectUsers.propTypes = {
  label: PropTypes.string,
  groupId: PropTypes.string.isRequired,
};
module.exports = SelectUsers;