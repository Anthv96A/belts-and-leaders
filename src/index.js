import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/index';
import './index.css';
import App from './app';
import { unregister } from './serviceWorker';
import { AzureAD } from 'react-aad-msal';
import authProvider from './azure/authProvider';

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <StrictMode>
    <Provider store={ store }>
      <AzureAD
        provider={ authProvider }
        reduxStore={ store }
      >
        {() => <App />}
      </AzureAD>
    </Provider>
  </StrictMode>
);

render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
