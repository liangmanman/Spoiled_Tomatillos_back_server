import { action, observable } from 'mobx'
import { axios } from '../api/_axios';
import { SIGNUP_API, SIGNIN_API } from '../api/constants';

class Account {
    @observable username = '';
    @observable password = '';
    @observable errorMessage = null;
    @observable account = null;

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
            self.account = res.data;
            self.errorMessage = null;
            self.username = '';
            self.password = '';
            console.log(account);
        }).catch(err => {
            self.errorMessage = err.message;
            console.log(err);
        });
    }

    @action logout() {
        self.account = null;
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