import React, {Component} from 'react';
import {HashRouter} from 'react-router-dom'
import RoutesContainer from './routesContainer'
import { Provider } from 'mobx-react'

import stores from '../store/index';

class IndexContainer extends Component {
   render() {
     return (
         <Provider store={stores}>
           <HashRouter>
             <RoutesContainer/>
           </HashRouter>
         </Provider>
     );
   }
}

export default IndexContainer;