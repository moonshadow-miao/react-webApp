import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './assets/js/fastclick'
import './assets/js/rem'
import 'antd-mobile/dist/antd-mobile.less'
import './assets/css/commom.less'
import 'lodash'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    window.FastClick.attach(document.body);
  }, false);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
