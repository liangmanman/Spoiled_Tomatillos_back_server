import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link} from "react-router-dom";

import { USER_LIKES_URI } from './routesContainer/uriConstants';
import { generateUserURI }  from '../util';

@inject(stores => {
    let { profiles, session } = stores;
    return {
        userInfo: session.userInfo,
        fetchUserProfile: profiles.fetchUserProfile,
    }
})
@observer
@withRouter
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.fetchUserProfile = this.fetchUserProfile.bind(this);
        this.state = {
            profileUserName: '',
            profileUserId: '',
        }
    }

    async fetchUserProfile() {
        const { userId } = this.props.match.params;
        let { fetchUserProfile } = this.props;
        let data = await fetchUserProfile({ userId });
        this.setState({
            profileUserName: data.fullName,
            profileUserId: data._id,
        })
    }

    componentWillMount() {
        this.fetchUserProfile();
    }

    render() {
        let { fullName, _id } = this.props.userInfo;
        let { profileUserName, profileUserId } = this.state;
        return (
            <div>
                <h2> You are logged in as {fullName}</h2>
                <h2>This is the Profile Page of User:  {profileUserName}</h2>
                <Link to={generateUserURI(profileUserId, USER_LIKES_URI)}>Likes</Link>
            </div>
        );
    }
}

export default ProfilePage;
