import * as React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from "../components/SignupForm";
// import NavBar from "../components/NavBar";

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/*<NavBar/>*/}
                <SignupForm />
                <Link to={'/'}>Go Back</Link>
            </div>
        );
    }
}

export default SignupPage;
