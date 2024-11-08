import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://' + window.location.host.split(':')[0] + ':8000';
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
