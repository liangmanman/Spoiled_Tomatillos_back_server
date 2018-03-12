import * as React from 'react';
import NavBar from "../components/NavBar";
import Cookies from 'universal-cookie';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: 'Not Logged In',
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.setState({username: cookies.get('username')});
  }

  render() {
    return (
        <div>
          <NavBar/>
          <h2>User Logged In: {this.state.username}</h2>
        </div>
    );
  }
}

export default HomePage;
