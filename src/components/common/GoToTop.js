import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

let timer = null;

function throttle() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    this.setState({
      show: document.querySelector('.container').scrollTop > 200
    });
  }, 100);
}

@connect(state=>({pathname:state.router.location.pathname}))
class GoToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.site > 200,
      pathname:this.props.pathname
    };
  }

  componentWillReceiveProps({pathname}){
    // 路由发生变化
    if(pathname!==this.state.pathname) this.props.setSite(document.querySelector('.container').scrollTop);
  }

  componentWillUnmount() {
    document.querySelector('.container').removeEventListener("scroll", throttle.bind(this), false);
  }

  componentDidMount() {
    let time = setTimeout(() => {
      clearTimeout(time)
      document.querySelector('.container').scrollTop = this.props.site;
    }, 100);
    document.querySelector('.container').addEventListener("scroll", throttle.bind(this), false);
  }

  goTop() {
    document.querySelector('.container').scrollTop = 0
  }

  render() {
    return (
      <div className={this.state.show ? 'goTop' : 'goTop hide'} onClick={this.goTop}>
        <img src={RES_URL + "image/top.png"} alt="暂无图片"/>
      </div>
    )
  }
}

GoToTop.propTypes = {
  setSite: PropTypes.func,
  site: PropTypes.number
}
export default GoToTop