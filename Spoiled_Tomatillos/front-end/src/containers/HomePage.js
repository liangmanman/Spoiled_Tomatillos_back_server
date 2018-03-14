import * as React from 'react';
import NavBar from '../components/NavBar';

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
        <NavBar/>
      </div>
    );
  }
}

export default HomePage;
