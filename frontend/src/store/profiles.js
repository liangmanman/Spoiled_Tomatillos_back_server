import { action, observable } from 'mobx'
import _ from 'lodash';

import { axios } from '../api/_axios';
import { PROFILE_USER_INFO } from '../api/constants';
import { generateUserURI } from '../util';


class Profiles {

    @observable errorMessage = null;

    @action async fetchUserProfile({ userId }) {
        self.errorMessage = null;
        try {
            const res = await axios.get(generateUserURI(userId, PROFILE_USER_INFO));
            return res.data;
        } catch (err) {
            self.errorMessage = err.message;
            console.log(err);
        }
    }

}

const self = new Profiles();

export default self;