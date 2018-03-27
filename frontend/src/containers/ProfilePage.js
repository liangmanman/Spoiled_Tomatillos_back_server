import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link} from "react-router-dom";
import { USER_LIKES_URI } from './routesContainer/uriConstants';
import { generateUserURI }  from '../util';

@inject(stores => {
    let { session } = stores;
    return {
        userInfo: session.userInfo,
    }
})
@observer
@withRouter
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let { fullName, _id } = this.props.userInfo;

        return (
            <div>
                <h1>Profile</h1>
                <h3>Hello {fullName}!</h3>
                <Link to={generateUserURI(_id, USER_LIKES_URI)}>Likes</Link>
            </div>
        );
    }
}

export default ProfilePage;
