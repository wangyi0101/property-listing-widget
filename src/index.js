import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './Data';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Data />, document.getElementById('root'));
registerServiceWorker();
