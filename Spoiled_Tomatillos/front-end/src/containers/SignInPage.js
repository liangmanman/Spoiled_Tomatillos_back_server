import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';


import SignInForm from "../components/SignInForm";

@inject(stores => {
    let { account } = stores.store;
    return {
        username: account.username,
        password: account.password,
        account: account.account,
        errorMessage: account.errorMessage,
        setUsername: account.setUsername,
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
            username,
            password,
            account,
            errorMessage,
            setUsername,
            setPassword,
            login,
        } = this.props;
        return (
            <div>
                {/*<NavBar/>*/}
                <SignInForm
                    username={username}
                    password={password}
                    account={account}
                    errorMessage={errorMessage}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    login={login}
                />
                <Link to={'/'}>Go Back</Link>
            </div>
        );
    }
}

export default SignInPage;
