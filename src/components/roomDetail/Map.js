import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Toast} from 'antd-mobile';

let map = null, geolocation = null, marker = null;

const style = {
  container: {
    width: '100%',
    height: '4rem'
  },
  text: {
    width: '5.57rem',
    height: '.66rem',
    lineHeight: '.66rem',
    background: 'rgba(0,0,0,.6)',
    color: '#fff',
    borderRadius: '4px',
    position: 'absolute',
    top: '3rem',
    marginLeft: '.96rem',
    padding: '0 .5rem'
  }
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
      resizeEnable: true,
    });
    map.plugin(["AMap.ToolBar", 'AMap.Scale'], function () {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    });
    marker = new AMap.Marker({
      offset: new AMap.Pixel(-22, -26),//相对于基点的位置
      icon: new AMap.Icon({  //复杂图标
        size: new AMap.Size(22, 26),//图标大小
        image: RES_URL + 'image/toolbar.png', //大图地址
        imageOffset: new AMap.Pixel(0, 0)//相对于大图的取图位置
      })
    });
    marker.setMap(map);
    if (!this.props.position) {
      map.plugin('AMap.Geolocation', () => {
        geolocation = new AMap.Geolocation({
          maximumAge: 60000,
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: 'LT',
          showCircle: false,
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', (data => {
          Toast.success('定位成功', 1);
          map.setZoomAndCenter(16);
        })); //返回定位信息
        AMap.event.addListener(geolocation, 'error', (data => {
          Toast.offline(data, 1);
        }));      //返回定位出错信息
      });
    } else {
      map.setZoomAndCenter(16, [121.60305, 31.1996]);
      marker.setPosition([121.60305, 31.1996])
    }
  }

  render() {
    return (<div style={{position:'relative',paddingBottom:'.4rem'}}>
      <div id="container" style={style.container}> </div>
      <div className="text" style={style.text}>
        浦东新区 博霞路 50 号 402 室
      </div>
    </div>)
  }
}

Map.propTypes = {
  position: PropTypes.object,
};

Map.defaultProps = {
  position: null
};

export default Map