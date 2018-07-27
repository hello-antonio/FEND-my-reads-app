import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import registerMyServiceWorker from './registerServiceWorker';
import webfont from 'webfontloader';
webfont.load({
  google:{
    families: ['Roboto:400,700']
  }
});
ReactDOM.render(
  <BrowserRouter>
    <App / >
  </BrowserRouter>,
  document.getElementById('root'));

registerMyServiceWorker();