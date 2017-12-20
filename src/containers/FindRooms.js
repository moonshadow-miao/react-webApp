import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import '../assets/css/findRoom.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setFindSite} from '../store/actions/indexList'
import asyncComponent from "../utils/Bundlle";
const GoodRooms = asyncComponent(() => import("../components/index/GoodRooms"));

const GoToTop = window.common.GoToTop,
  FooterTip = window.common.FooterTip;

@connect(state => ({findSite:state.reducers.index.findSite}), dispatch => bindActionCreators({setFindSite}, dispatch))
class FindRooms extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (<div className="container">
      <GoToTop site={this.props.findSite} setSite={this.props.setFindSite}/>
      <FooterTip/>
      <GoodRooms lists = {[]} />
    </div>)
  }
}

export default FindRooms