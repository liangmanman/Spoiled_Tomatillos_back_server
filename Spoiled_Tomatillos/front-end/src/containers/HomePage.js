import * as React from 'react';
import { Link } from 'react-router-dom'
import {MOVIE_LIST_URI, SIGNUP_URI} from "./routesContainer/uriConstants";

class HomePage extends React.Component {
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
                <Link to={MOVIE_LIST_URI}>Movie List</Link>
                <br/>
                <Link to={SIGNUP_URI}>Sign Up</Link>
                <form onSubmit={this.handleLogin}>
                    <label>
                        Username or Email Address:
                        <br/>
                        <input type={"text"} name={"name"} />
                        <br/>
                    </label>
                    <label>
                        Password:
                        <br/>
                        <input type={"text"} name={"password"} />
                        <br/>
                    </label>
                    <input type={"submit"} value={"Log In"} />
                </form>
            </div>
        );
    }

    handleLogin(event) {
        alert('user tried to log in!');
    }
}

export default HomePage;
