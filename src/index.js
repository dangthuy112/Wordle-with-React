import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./app/store";
import { Provider } from 'react-redux';
import Login from './components/Login';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Login />
  </Provider>
  ,
  document.getElementById('root')
)