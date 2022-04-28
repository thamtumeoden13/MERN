import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import reportWebVitals from './reportWebVitals';

import reducers from './redux/reducers';

import './index.css';

// import createSageMiddleware from 'redux-saga'
// import mySaga from './redux/sagas';

// const sageMiddleware = createSageMiddleware()

// const store = createStore(reducers, applyMiddleware(sageMiddleware))

// sageMiddleware.run(mySaga)


const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();