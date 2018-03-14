import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css'; 
import App from './App';
import store from './store';
// import * as firebase from 'firebase';

// firebase.initializeApp({
//   apiKey: "AIzaSyAeCClXw4WoCbQHlVyeLf78hQb_D0rn-PI",
//   authDomain: "ss-smtracking.firebaseapp.com",
//   databaseURL: "https://ss-smtracking.firebaseio.com",
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);