import React from 'react';
import ReactDOM from 'react-dom';
import 'gestalt/dist/gestalt.css';
import './index.css';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
