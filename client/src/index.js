import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import App from './App';

//by using thunk, this variable store, whoich is later rendered, is the overall connection between the actions in the frontend and the state changes and data changing of the backend
const store = createStore(reducers, compose(applyMiddleware(thunk)));

//the variable store (uses thunk) is rendered and IS what is displayed on the website for users and viewers to see
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);