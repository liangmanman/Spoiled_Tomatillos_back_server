import { action, observable } from 'mobx'

import { axios } from '../api/_axios';
import { SIGNUP_API } from '../api/constants';
import { setXAccessToken } from "../util/index";
import sessionStore from "./session";


class Register {
    @observable email = '';
    @observable password = '';
    @observable fullName = '';
    @observable errorMessage = null;

    constructor () {
    }

    @action setEmail(email) {
        self.email = email;
    }

    @action setPassword(password) {
        self.password = password;
    }

    @action setFullName(fullName) {
        self.fullName = fullName;
    }
    
    @action resetForm() {
        self.errorMessage = null;
        self.email = '';
        self.password = '';
        self.fullName = '';
    }

    @action async onRegister() {
        try {
            const res = await axios.post(SIGNUP_API, {
                fullName: self.fullName,
                email: self.email,
                password: self.password
            });
            setXAccessToken(res.data.token);
            self.resetForm();
            await sessionStore.getUserInfo();
        } catch (err) {
            self.errorMessage = err.message;
        }
    }

}

const self = new Register();

export default self;