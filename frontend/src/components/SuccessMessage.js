import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class SuccessMessage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (_.isNil(this.props.successMessage)) {
      return <div></div>;
    }

    return (
      <div className="alert alert-success" role="alert">
        {this.props.successMessage}
      </div>
    );
  }
}

SuccessMessage.propTypes = {
  successMessage: PropTypes.string,
};


export default SuccessMessage;