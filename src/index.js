import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/AnimeCardList';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
