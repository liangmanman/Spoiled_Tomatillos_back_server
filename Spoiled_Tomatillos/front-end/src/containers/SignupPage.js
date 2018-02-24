import * as React from 'react';
import { Link } from 'react-router-dom';
import {MOVIE_LIST_URI, SIGNUP_URI} from "./routesContainer/uriConstants";
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
                <Link to={'/'}>Go Back</Link>
            </div>
        );
    }
}

export default SignupPage;
