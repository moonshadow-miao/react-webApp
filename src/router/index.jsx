import React, {Component} from 'react';
import {BrowserRouter, Route ,Redirect } from 'react-router-dom'
import Bundle from './bundle'
import indexContainer from 'bundle-loader?lazy../views/index'

const Index = () => (
  <Bundle load={indexContainer}>
    {Index => <Index/>}
  </Bundle>
)

const options = {
  basename:'/', // 为所有位置添加一个基准URL
  getUserConfirmation: ()=>{}, // 导航到此页面前执行的函数,
  forceRefresh:'pushState' in window.history,  //当浏览器不支持 HTML5 的 history API 时强制刷新页面。
  keyLength:'8' // 设置它里面路由的 location.key 的长度。默认是6 （key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）todo
};

class RouterIndex extends Component {
  render() {
    return (
      <BrowserRouter basename = {options.basename} >
        <div>
          <Redirect to="/index"></Redirect>
          <Route path="/index" component={Index}></Route>
          {/*<Route path="/login" component={Login}></Route>*/}
        </div>
      </BrowserRouter>

    )
  }
}

export default RouterIndex