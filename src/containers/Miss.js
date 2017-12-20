import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const HeaderNav = window.common.HeaderNav;
const style = {
  container: {
    width: '100%',
    display: 'none'
  },
  img: {
    width: '100%',
    marginTop: '.5rem'
  },
  tip: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: '3',
    fontSize: '18px',
  },
  span: {
    fontWeight: 'bold',
    lineHeight: '3',
    fontSize: '18px',
    color: '#ff8084'
  }
};

let timer = null,
  timer2 = null;

class Miss extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      seconds: 10
    }
  }

  timeTip() {
    timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1
      }), () => {
        if (this.state.seconds <= 0) {
          this.props.history.replace('/')
          clearInterval(timer);
        }
      })
    }, 1000)
  }

  handle() {
    timer2 = setTimeout(() => {
      if (document.querySelectorAll('.container').length <= 1) {
        this.refs.miss.style.display = 'block';
        this.timeTip();
      } else {
        this.refs.miss.style.display = 'none'
        clearInterval(timer);
        clearInterval(timer2);
      }
    }, 500);
  }

  componentDidMount() {
    this.handle();
  }

  componentWillReceiveProps(prop) {
    this.handle();
  }

  componentWillUnmount() {
    clearInterval(timer);
    clearInterval(timer2);
  }

  render() {
    return (
      <div className='container miss' style={style.container} ref='miss'>
        <HeaderNav/>
        <img src={RES_URL + 'image/404.jpg'} alt="暂无图片" style={style.img}/>
        <div style={style.tip}> {this.state.seconds}秒后 <Link to='/'><span style={style.span}>回到首页</span></Link></div>
      </div>
    );
  }
};

export default Miss;