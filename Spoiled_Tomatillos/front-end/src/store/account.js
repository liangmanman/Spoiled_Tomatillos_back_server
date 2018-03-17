import { action, observable } from 'mobx'
import Cookies from 'universal-cookie';
import _ from 'lodash';

import { axios } from '../api/_axios';
import { SIGNIN_API } from '../api/constants';

const cookies = new Cookies();

class Account {
    @observable username = '';
    @observable password = '';
    @observable errorMessage = null;
    @observable userInfo = null;

    constructor () {
        let userInfoFromCookie = cookies.get('userInfo');
        if (!_.isNil(userInfoFromCookie)) {
            this.userInfo = userInfoFromCookie;
        }
    }

    @action setUserInfo(userInfo) {
        self.userInfo = userInfo;
        if (_.isNil(userInfo)) {
            cookies.remove('userInfo');
        } else {
          cookies.set('userInfo', userInfo);
        }
    }

    @action setUsername(username) {
        // console.log(username);
        self.username = username;
    }


    @action setPassword(password) {
        self.password = password;
    }

    @action login() {
        return axios.post(SIGNIN_API,
            {
                username: self.username,
                password: self.password,
            }
        ).then(res => {
            self.setUserInfo(res.data);
            self.errorMessage = null;
            self.username = '';
            self.password = '';
            console.log(self.userInfo);
        }).catch(err => {
            self.errorMessage = err.message;
            console.log(err);
        });
    }

    @action logout() {
      self.setUserInfo(null);
        self.errorMessage = null;

    }

    // @action register(params) {
    //     return this.request.post('api/account/register', params).then(account => {
    //         this.state.account = account
    //     })
    // }
}

const self = new Account();

export default self;