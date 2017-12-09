import React, { Component } from 'react';
import { Button } from 'antd-mobile';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {bannerImg: 'static/media/main.png'};
  }
  render() {
    return (
      <div>
        <div className="banner">
          <img src='../assets/image/main.png' alt="暂无图片"/>
        </div>
      </div>
    );
  }
}

export default Index;