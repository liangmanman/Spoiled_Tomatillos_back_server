import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { PROFILE_ME_API } from '../api/constants';
import { setXAccessToken } from "../util/index";

class Session {
    @observable userInfo = null;

    constructor () {
        this.getUserInfo();
    }

    @action logout() {
        setXAccessToken(null);
        self.userInfo = null;
    }
    @action async getUserInfo() {
        try {
            const res = await axios.get(PROFILE_ME_API);
            self.userInfo = res.data;
            return res.data;
        } catch(err) {
            setXAccessToken(null);
        }
    }
}

const self = new Session();

export default self;