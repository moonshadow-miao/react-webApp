import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import 'antd-mobile/lib/icon/style';
import '../assets/css/findRoom.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setFindSite} from '../store/actions/indexList'
import {storeCity} from '../store/actions/common'
import asyncComponent from "../utils/Bundlle";

const GoodRooms = asyncComponent(() => import("../components/index/GoodRooms"));
const HeaderSearch = asyncComponent(() => import("../components/findRooms/HeaderSearch"));
const Filter = asyncComponent(() => import("../components/findRooms/Filter"));

const GoToTop = window.common.GoToTop,
  FooterTip = window.common.FooterTip;



@connect(state => ({
  findSite: state.reducers.index.findSite,
  cities: state.reducers.common.cities,
  currentCity: state.reducers.common.currentCity
}), dispatch => bindActionCreators({setFindSite, storeCity}, dispatch))
class FindRooms extends Component {
  // state = { count : 0 }
  // // 0 1 1 1 2 2 2
  // componentDidMount() {
  //   this.setState({ count: this.state.count + 1 }, () => {
  //     console.log(`apple.2 .. ${this.state.count}`)  // 1
  //   })
  //
  //   console.log(`orange.1 .. ${this.state.count}`)  // 0
  //
  //   setTimeout(() => {
  //     console.log(`lemen.3 .. ${this.state.count}`)  // 1
  //
  //     this.setState({ count: this.state.count + 1 }, () => {
  //       console.log(`banana.4 .. ${this.state.count}`)  // 2
  //     })
  //
  //     this.setState({ count: this.state.count + 1 }, () => {
  //       console.log(`strawberry.5 .. ${this.state.count}`)  // 3
  //     })
  //
  //     setTimeout(() => {
  //       console.log(`grape.7..${this.state.count}`)  // 3
  //     }, 0)
  //
  //     console.log(`pear .6.. ${this.state.count}`)  // 3
  //   }, 0)
  // }
  render() {
    return (<div className="container findRooms">
      <GoToTop site={this.props.findSite} setSite={this.props.setFindSite} container='.findRooms'/>
      <FooterTip/>
      <HeaderSearch cities={this.props.cities} currentCity={this.props.currentCity} storeCity={this.props.storeCity}/>
      <Filter/>
      <GoodRooms lists={[]}/>
    </div>)
  }
}

export default FindRooms