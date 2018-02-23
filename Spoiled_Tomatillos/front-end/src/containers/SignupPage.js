import * as React from 'react';
import SignupForm from "../components/SignupForm";

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
                <h2>Spoiled Tomatillos</h2>
                <SignupForm />
            </div>
        );
    }
}

export default SignupPage;
