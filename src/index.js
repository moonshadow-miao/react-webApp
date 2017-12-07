import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './assets/js/fastclick'
import 'antd-mobile/dist/antd-mobile.less'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    window.FastClick.attach(document.body);
  }, false);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
