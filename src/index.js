import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './assets/js/fastclick'
import './assets/js/rem'
import 'antd-mobile/dist/antd-mobile.less'
import './assets/css/commom.less'
import './assets/font/font-awesome.less'
import HeaderNav from './components/common/HeaderNav'
import GoToTop from './components/common/GoToTop'
import FooterTip from './components/common/FooterTip'
window.common = {HeaderNav,GoToTop,FooterTip}; // todo
import './store/actions/indexList'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    window.FastClick.attach(document.body);
  }, false);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
