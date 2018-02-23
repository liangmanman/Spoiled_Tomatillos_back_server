import React, { Component, } from 'react';
import { HashRouter } from 'react-router-dom'
import RoutesContainer from './routesContainer'

class IndexContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <RoutesContainer/>
            </HashRouter>
        );

    }
}


export default IndexContainer;