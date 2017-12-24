import React, {Component} from 'react';
import {Modal, Icon, Carousel,Tabs} from 'antd-mobile';
import '../assets/css/detail.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setDetailSite} from '../store/actions/indexList'
import asyncComponent from '../utils/Bundlle'

const alert = Modal.alert;
const Map = asyncComponent(()=>import('../components/roomDetail/Map'));
const GoToTop = window.common.GoToTop;
const tab_address = [ { title: <div><span className='icon-map-marker m-r-5'> </span>地铁</div> }, { title: <div><span className='icon-inbox m-r-5'> </span>交通</div> }, { title: <div><span className='icon-home m-r-5'> </span>周边配套</div> }];

@connect(state => ({detailSite: state.reducers.index.detailSite,}), dispatch => bindActionCreators({
  setDetailSite
}, dispatch))
class HouseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgHeight: '',
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      currentNum: 1,
      initMap:null,
    }
  }
  
  componentDidMount(){
    if(!document.querySelector('#mapJs')){
      let script = document.createElement('script');
      script.src = 'http://webapi.amap.com/maps?v=1.4.2&key=b728010ec00546dd077a0a6c14516a66';
      script.id = 'mapJs';
      script.async = 'async';
      document.body.appendChild(script);
    }
  }

  showPicNum = num => {
    this.setState({currentNum: num+1})
  };

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (<div className="container houseDetail">
      <GoToTop container='.houseDetail' setSite={this.props.setDetailSite} site={this.props.detailSite}/>
      {/*轮播图*/}
      <div className="sliders" onClick={this.goBack}>
        <div className="back">
          <span className='icon-angle-left'> </span>
        </div>
        <div className="show_pics">
          {this.state.currentNum + '/' + this.state.data.length}
        </div>
        <div className="slider">
          <Carousel autoplay={false} infinite selectedIndex={0} dots={false} afterChange={num => this.showPicNum(num)}>
            {this.state.data.map(ii => (
              <a
                key={ii}
                href="http://www.alipay.com"
                style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
                  alt=""
                  style={{width: '100%', verticalAlign: 'top'}}
                  onLoad={() => {
                    this.setState({imgHeight: 'auto'});
                  }}
                />
              </a>
            ))}
          </Carousel>
        </div>
      </div>

      {/*基本信息*/}
      <div className="base_detail">
        <div className="room_name">
          合租 - 爱博二村
        </div>
        <div className="price">
        <span>¥1450</span>/<span>月</span> <span>（付一押一）</span>
        </div>
        <div className="base">
          <ul>
            <li>6户合租</li>
            <li>朝北-次卧</li>
            <li>13M²</li>
            <li>电梯3/33层</li>
          </ul>
        </div>
        <div className="tag">
          <ul className='clearfix'>
            <li>独卫</li>
            <li>电梯房</li>
            <li>非一楼</li>
            <li>近地铁</li>
          </ul>
        </div>
      </div>
      <div className="line"> </div>
      <div className="promise">
        <span>房源实拍</span> <span>巴乐兔管家亲自上门拍照，承诺100% 真实</span>
      </div>
      <div className="line"> </div>

      {/*地址/交通/周边配套*/}
      <Tabs tabs={tab_address} initalPage={0} swipeable={false}>
        <div className='metro sub_address'>
          <div className="site">
            松江&nbsp;九亭&nbsp;涞坊路333弄、涞坊路359号
          </div>
          <Map />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff'}}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
    </div>)
  }
}

export default HouseDetail