import *as React from 'react';
import * as ReactDOM   from 'react-dom';
import routes from './routes';
import {Provider} from 'react-redux';
let configureStore = require('./redux/configureStore');

import {default as DevTools} from 'components/DevTools';
import Router from "react-router/lib/Router";
import browserHistory from "react-router/lib/browserHistory";
// redux инструменты разработчика

const initialState = (window as any).REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const component = (
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </ Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));
ReactDOM.render(<DevTools store={store}/>, document.getElementById('dev-tools'));