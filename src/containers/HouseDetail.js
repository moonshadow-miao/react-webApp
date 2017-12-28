import React, {Component} from 'react';
import {Icon, Carousel, Tabs} from 'antd-mobile';
import '../assets/css/detail.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setDetailSite} from '../store/actions/indexList'
import asyncComponent from '../utils/Bundlle'

const Footer =  asyncComponent(() => import('../components/roomDetail/Footer'));
const RoomList =  asyncComponent(() => import('../components/index/GoodRooms'));
const Guess =  asyncComponent(() => import('../components/roomDetail/Guess'));
const GoToTop = window.common.GoToTop;
const tab_address = [{title: <div><span className='icon-map-marker m-r-5'> </span>地铁</div>}, {
  title: <div><span className='icon-inbox m-r-5'> </span>交通</div>
}, {title: <div><span className='icon-home m-r-5'> </span>周边配套</div>}];
const tab_facilities = [{title: '独用设施'}, {title: '共用设施'}]

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
      Map: null,
    }
  }

  componentDidMount() {
    if (!document.querySelector('#mapJs')) {
      let script = document.createElement('script');
      script.src = 'http://webapi.amap.com/maps?v=1.4.2&key=b728010ec00546dd077a0a6c14516a66';
      script.id = 'mapJs';
      script.async = 'async';
      document.body.appendChild(script);
    }
    this.state.Map = asyncComponent(() => import('../components/roomDetail/Map'));
  }

  showPicNum = num => {
    this.setState({currentNum: num + 1})
  };

  goBack = () => {
    this.props.history.goBack();
  }

  render() {

    return (<div className="container houseDetail">
      <GoToTop container='.houseDetail' setSite={this.props.setDetailSite} site={this.props.detailSite}/>
      <Footer />
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
              <a key={ii} href="http://www.alipay.com" style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}>
                <img src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`} alt="" style={{width: '100%', verticalAlign: 'top'}} onLoad={() => {this.setState({imgHeight: 'auto'});}}/>
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
        <div className='sub_address'>
          <div className="site">
            松江&nbsp;九亭&nbsp;涞坊路333弄、涞坊路359号
          </div>
        </div>
        <div className='sub_address'>
          <div className="site">
            933路;723路;762路;829路;405路;100路;116B路;134路;142路;329路;528路 <br/>
            3号线(赤峰路站)，步行13分钟
          </div>
        </div>
        <div className='sub_address'>
          <div className="site">
            <ul>
              <li><span> 饮食：</span>咕的咕的韩国炭烤肉店、辛元潮汕牛肉火锅、二王府火锅、虞家宴、藏乐汤坊</li>
              <li><span> 购物：</span>上海建工医院、精武公园、第四中心小学、上农家庭药房</li>
              <li><span> 生活：</span>凯德龙之梦购物中心、曲阳生活购物中心、正大生活馆、家乐福</li>
            </ul>
          </div>
        </div>
      </Tabs>
      <div className="map">
        {
          this.state.Map ? <this.state.Map position={{lng: 2, lat: 2}}/> : null
        }
      </div>
      <div className="line"> </div>

      {/*共用设施/独用设施*/}
      <Tabs tabs={tab_facilities} initalPage={0} swipeable={false}>
        <ul className="facilities clearfix">
          <li><img  src={RES_URL + "image/1.png"} alt=""/></li>
          <li><img  src={RES_URL + "image/3.png"} alt=""/></li>
          <li><img  src={RES_URL + "image/7.png"} alt=""/></li>
          <li><img  src={RES_URL + "image/19.png"} alt=""/></li>
        </ul>
        <div className="facilities">
          <ul className="facilities clearfix" >
            <li><img src={RES_URL + "image/114.png"} alt=""/></li>
            <li><img src={RES_URL + "image/116.png" }alt="" /></li>
            <li><img src={RES_URL + "image/117.png"} alt="" /></li>
            <li><img src={RES_URL + "image/135.png"} alt="" /></li>
            <li><img src={RES_URL + "image/136.png"} alt="" /></li>
          </ul>
        </div>
      </Tabs>
      <div className="line"> </div>

      {/*室友信息/房客评价*/}
      <div className="roommate">
        <h4>— 室友信息 —</h4>
        <ul className="roomList">
          <li className='clearfix'>
            <span className='fl'>A</span>
            <span className='fl'>20M²-朝东南-主卧</span>
            <span className='fl'>未入住</span>
          </li>
          <li className='clearfix'>
            <span className='fl'>B</span>
            <span className='fl'>20M²-朝东南-主卧</span>
            <span className='fl'>未入住</span>
          </li>
        </ul>
      </div>
      <div className="line"> </div>
      <div className="roommate">
        <h4>— 房客评价 —</h4>
        <div className="comment">
          <div className="star_bg">
            <div className="star">
              <img src={require('../assets/image/star.png')} alt=""/>
            </div>
            <span>4.7分</span>
          </div>
          <div className="comments">
            5条评价
            <span className='icon-angle-right'> </span>
          </div>
        </div>
        <div className="content">
          <div className="user clearfix">
            <div className="avatar fl">
              <img src={RES_URL+'image/avatar.jpg'} alt=""/>
            </div>
            <div className="name fl">
              <p>匿名</p>
              <p className='time'>2017-12-24 23:51:24发表评论 </p>
            </div>
            <div className="comment_text name fl">
              设施环境:房东人很好，之前电灯坏了，房东很及时的过来处理，网费到期了，只要通知他，就很及时的处理好！
            </div>
          </div>
        </div>
      </div>
      <div className="line"> </div>

      <h4>— 认证保障 —</h4>
      <div className='authentication'>
        <div className="auth">
          <span>证</span>
          <p>认证房东</p>
        </div>
        <div className="auth">
          <span>免</span>
          <p>免佣</p>
        </div>
        <div className="auth">
          <span>月</span>
          <p>月付</p>
        </div>
        <div className="auth">
          <span>管</span>
          <p>专属管家</p>
        </div>
      </div>
      <div className="line"> </div>

      {/*相似房源*/}
      <h4>— 相似房源 —</h4>
      <RoomList />
      <div className="another">
        <span>换一批</span>
      </div>
      <div className="line"> </div>

      {/*猜你喜欢*/}
      <h4>— 猜你喜欢 —</h4>
      <Guess />
      <div className="another">
        <span>换一批</span>
      </div>

      <div className="report">
        <img src={RES_URL + 'image/report.png'} alt=""/>
      </div>
    </div>)
  }
}

export default HouseDetail