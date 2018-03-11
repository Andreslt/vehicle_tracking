import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css'; 
import App from './App';
import store from './store';
// import { loadProducts } from './actionCreators';
// store.dispatch(loadProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);