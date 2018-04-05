import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import SignInForm from "../components/SignInForm";

@inject(stores => {
    let { account } = stores;
    return {
        email: account.email,
        password: account.password,
        errorMessage: account.errorMessage,
        setEmail: account.setEmail,
        setPassword: account.setPassword,
        login: account.login,
    }
})
@observer
@withRouter
class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
    }

    render() {
        let {
            email,
            password,
            userInfo,
            errorMessage,
            setEmail,
            setPassword,
            login,
        } = this.props;
        return (
            <div>
                <SignInForm
                    email={email}
                    password={password}
                    errorMessage={errorMessage}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    login={login}
                />
            </div>
        );
    }
}

export default SignInPage;
