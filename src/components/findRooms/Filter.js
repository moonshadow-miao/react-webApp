import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import '../../assets/css/filter.less'


let tabs = ['位置', '租金', '户型', '更多'];

let timer = null;
const rem = parseInt(document.querySelector('html').style.fontSize);

function throttle() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    this.setState({
      isFixed: document.querySelector('.findRooms').scrollTop > 0.8 * rem,
    });
  }, 100);
}


@connect()
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTabs: 1,
      isFixed: false,
      isShowPanel: false,
    };
  }

  componentWillUnmount() {
    document.querySelector('.findRooms').removeEventListener("scroll", throttle.bind(this), false);
  }

  componentDidMount() {
    document.querySelector('.findRooms').addEventListener("scroll", throttle.bind(this), false);
  }

  showPanel(index) {
    this.setState({
      showTabs: index,
      isFixed: true,
      isShowPanel: true
    })
  }

  hidePanel = () => {
    this.setState({
      isFixed: false,
      isShowPanel: false
    })
  }

  render() {
    return (
      <div className={'filter'}>
        <div className={"tab-wrapper" + (this.state.isFixed ? ' fixed' : '')} onClick={this.showFilter}>
          {
            tabs.map((v, i) => (
              <div className="tab" key={i} onClick={this.showPanel.bind(this, i + 1)}>
                <span className="tab-text">{v}</span>
                <span className="icon-angle-down"> </span>
              </div>
            ))
          }
        </div>
        <div className={"panels" + (this.state.isShowPanel ? ' show_panel' : 'hide')}>
          <div className={(this.state.showTabs === 1 ? '' : 'hide') + ' panel'}>

          </div>
          <div className={(this.state.showTabs === 2 ? '' : 'hide') + ' panel'}>

          </div>
          <div className={(this.state.showTabs === 3 ? '' : 'hide') + ' panel'}>

          </div>
          <div className={(this.state.showTabs === 4 ? '' : 'hide') + ' panel'}>

          </div>
          <div className="mask" onClick={this.hidePanel}>

          </div>
        </div>
      </div>
    )
  }
}

Filter.propTypes = {};
export default Filter