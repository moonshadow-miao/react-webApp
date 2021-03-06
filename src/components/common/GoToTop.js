import React, {PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

let timer = null;

function throttle() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    this.setState({
      show: document.querySelector(this.props.container).scrollTop > 200
    });
  }, 100);
}

let pathname = null;

@connect(state=>({pathname:state.router.location.pathname}))
class GoToTop extends PureComponent  {
  static propTypes = {
    setSite: PropTypes.func,
    site: PropTypes.number,
    container: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.site > 200,
    };
    pathname = this.props.pathname
  }

  componentWillReceiveProps({path}){
    // 判断路由发生变化
    if(path!==pathname){
      pathname = path; // 防止触发两次 todo ?为什么会触发两次
      this.props.setSite(document.querySelector('.container').scrollTop);
    }
  }

  componentWillUnmount() {
    document.querySelector(this.props.container).removeEventListener("scroll", throttle.bind(this), false);
  }

  componentDidMount() {
    let time = setTimeout(() => {
      clearTimeout(time)
      document.querySelector(this.props.container).scrollTop = this.props.site;
      document.querySelector(this.props.container).addEventListener("scroll", throttle.bind(this), false);
    }, 200);
  }

  goTop = ()=>{
    document.querySelector(this.props.container).scrollTop = 0
  }

  render() {
    return (
      <div className={this.state.show ? 'goTop' : 'goTop hide'} onClick={this.goTop}>
        <img src={RES_URL + "image/top.png"} alt="暂无图片"/>
      </div>
    )
  }
}

export default GoToTop