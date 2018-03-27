import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (_.isNil(this.props.errorMessage)) {
            return <div></div>;
        }

        return (
            <div className="alert alert-danger" role="alert">
                {this.props.errorMessage}
            </div>
        );
    }
}

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string,
};


export default ErrorMessage;