import React from 'react';
import { withRouter } from "react-router-dom";

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    //this.handleSubmit = this.handleSubmit.bind(this);
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const searchContent = e.target.elements.searchContent.value.trim();
  //   if (searchContent) {
  //     this.props.history.push({
  //       pathname: '/search',
  //       search: '?query='+searchContent
  //     });
  //   }
  // };

  render() {
    return (
      <div>
        <h1>test</h1>
      </div>
    );
  }
}

export default Reviews;
