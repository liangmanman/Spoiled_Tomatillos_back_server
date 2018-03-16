import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { SIGNIN_API, PROFILE_ME_API } from '../api/constants';
import { setXAccessToken } from "../util/index";
import sessionStore from "./session";

class Account {
    @observable email = '';
    @observable password = '';
    @observable errorMessage = null;
    @observable userInfo = null;

    constructor () {
    }

    @action setEmail(email) {
        self.email = email;
    }


    @action setPassword(password) {
        self.password = password;
    }

    @action async login() {
        try {
            const res = await axios.post(SIGNIN_API,
                {
                    email: self.email,
                    password: self.password,
                }
            );

            setXAccessToken(res.data.token);
            await sessionStore.getUserInfo();
            self.errorMessage = null;
            self.email = '';
            self.password = '';
        } catch (err) {
            debugger;
            self.errorMessage = err.message;

        }
    }


    // @action register(params) {
    //     return this.request.post('api/account/register', params).then(account => {
    //         this.state.account = account
    //     })
    // }
}

const self = new Account();

export default self;