import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux';

import Shell from './components/Shell';
import { appReducer } from './reducers';
import * as serviceWorker from './serviceWorker';
import { TAppState } from './types';

import './index.css';

export type TGlobalState = {
    appModule: TAppState
};

const rootReducer = combineReducers({
    appModule: appReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Shell />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
