import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import asyncComponent from '../utils/Bundlle'
import {Modal} from 'antd-mobile';
const alert = Modal.alert;

const Index = asyncComponent(() => import("../containers/Index"));
const Login = asyncComponent(() => import("../containers/Login"));
const ForgetPwd = asyncComponent(() => import("../containers/ForgetPwd"));
const Register = asyncComponent(() => import("../containers//Register"));

const history = createHistory({
  getUserConfirmation:(message, callback) => {
   let res = new Promise((resolve, reject)=>{
      alert('提示', message , [
        { text: '取消', onPress: () => reject(false)},
        { text: '确认', onPress: () =>  resolve(true)},
      ]);
    });
    res.then(()=>{callback(true)}).catch(()=>{callback(false)})
  }
});

history.block((location, action) => {
  if(location.pathname ==='/register' && action=== 'POP'){
    return '确认离开当前页面?'
  }
  if(location.pathname ==='/forget-pwd' && action=== 'POP'){
    return '确认离开当前页面?'
  }
  if(location.pathname ==='/login' && action=== 'POP'){
    return '确认离开当前页面?'
  }
})

history.listen((location, action) => {
  console.log(`The current URL is ${location.pathname},search:${location.search},hash:${location.hash}`)
  console.log(`The last navigation action was ${action}`)
});

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Index}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/forget-pwd" component={ForgetPwd}/>
          <Route exact path="/register" component={Register}/>
        </div>
      </ConnectedRouter>);
  }
}
export default Router


