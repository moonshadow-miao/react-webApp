import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setDetailSite} from '../../store/actions/indexList'

@connect(state => ({detailSite: state.reducers.index.detailSite,}), dispatch => bindActionCreators({
  setDetailSite
}, dispatch))
class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }


  render() {
    return (<footer className="footer clearfix">
      <div className="collection fl">
        <span className='icon-heart'> </span>
        <p>收藏</p>
      </div>
      <div className="order fl">预约看房</div>
      <a href="tel:17717551536">
        <div className="tel fl">电话客服</div>
      </a>
    </footer>)
  }
}

export default Footer