import React, {Component} from 'react';
import {throttle} from '../../utils/index'

class GoToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    document.body.addEventListener("scroll", throttle(() => {
      let isShow = document.body.scrollTop > 200;
      this.setState({
        show: isShow
      })
    }));
  }

  goTop() {
    document.body.scrollTop = 0
  }

  render() {
    return (
      <div className={this.state.show ? 'goTop' : 'goTop hide'} onClick={this.goTop}>
        <img src="http://localhost:3030/image/top.png" alt="暂无图片"/>
      </div>
    )
  }
}

export default GoToTop