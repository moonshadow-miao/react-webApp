import React from 'react';
import {Link} from 'react-router-dom'
import {Icon} from 'antd-mobile';
import 'antd-mobile/lib/icon/style';
import PropTypes from 'prop-types';
import '../../assets/css/goodRoom.less'

let lists = [
  { "house_id": "867383",},{ "house_id": "767333",},{ "house_id": "867833",},
  {
    "house_id": "867333",
    "lan_co_id": 4821,
    "comprehensive_score": "4.2",
    "score_number": 90,
    "fangdong_say": "",
    "is_qiye_fangdong": 0,
    "fuwu_labels": [],
    "fangdong_chnuo": "",
    "publish_date": "今天发布",
    "is_true_photo": 1,
    "house_photo_num": 9,
    "is_proxy_served": null,
    "area_list": "松江-松江老城",
    "title_name": "合租-松乐苑",
    "is_monthly_pay": 1,
    "month_rent": 1200,
    "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/868/867333/oss_5a30bc1bc89ac.jpg@!380_280.png",
    "subdistrict_name": "松乐苑",
    "s_subway_desc": "",
    "house_info_concat": "5户合租 | 朝西南-次卧 | 18M²",
    "house_labels": ["新上架", "非一楼"],
    "BAhouse": "867333|松乐苑-1室0厅0卫|松江老城-上海|松江老城-松江|合租|1200",
    "GaName": "松乐苑 1室0厅0卫"
  }, {
    "house_id": "1538599",
    "lan_co_id": 10881,
    "comprehensive_score": "0.0",
    "score_number": 0,
    "fangdong_say": "",
    "is_qiye_fangdong": 0,
    "fuwu_labels": [],
    "fangdong_chnuo": "",
    "publish_date": "今天发布",
    "is_true_photo": 1,
    "house_photo_num": 8,
    "is_proxy_served": null,
    "area_list": "松江-松江新城",
    "title_name": "合租-润峰苑",
    "is_monthly_pay": 1,
    "month_rent": 1200,
    "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/1539/1538599/oss_5a15078cd72e8.jpg@!380_280.png",
    "subdistrict_name": "润峰苑",
    "s_subway_desc": "",
    "house_info_concat": "3户合租 | 朝南-主卧 | 25M²",
    "house_labels": ["新上架", "主卧", "朝南", "独卫", "独立厨房"],
    "BAhouse": "1538599|润峰苑-1室0厅1卫|松江新城-上海|松江新城-松江|合租|1200",
    "GaName": "润峰苑 1室0厅1卫"
  }, {
    "house_id": "876368",
    "lan_co_id": 4821,
    "comprehensive_score": "4.2",
    "score_number": 90,
    "fangdong_say": "",
    "is_qiye_fangdong": 0,
    "fuwu_labels": [],
    "fangdong_chnuo": "",
    "publish_date": "今天发布",
    "is_true_photo": 1,
    "house_photo_num": 13,
    "is_proxy_served": null,
    "area_list": "松江-松江大学城",
    "title_name": "合租-久阳文华府邸",
    "is_monthly_pay": 1,
    "month_rent": 1500,
    "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/877/876368/oss_591e90adc759c.jpg@!380_280.png",
    "subdistrict_name": "久阳文华府邸",
    "s_subway_desc": "",
    "house_info_concat": "4户合租 | 朝南-主卧 | 24M²",
    "house_labels": ["新上架", "主卧", "朝南", "独卫", "电梯房"],
    "BAhouse": "876368|久阳文华府邸-1室0厅1卫|松江大学城-上海|松江大学城-松江|合租|1500",
    "GaName": "久阳文华府邸 1室0厅1卫"
  }, {
    "house_id": "876369",
    "lan_co_id": 4821,
    "comprehensive_score": "4.2",
    "score_number": 90,
    "fangdong_say": "",
    "is_qiye_fangdong": 0,
    "fuwu_labels": [],
    "fangdong_chnuo": "",
    "publish_date": "今天发布",
    "is_true_photo": 1,
    "house_photo_num": 19,
    "is_proxy_served": null,
    "area_list": "松江-松江大学城",
    "title_name": "合租-久阳文华府邸",
    "is_monthly_pay": 1,
    "month_rent": 1100,
    "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/877/876369/oss_591e8ebb0d2d6.jpg@!380_280.png",
    "subdistrict_name": "久阳文华府邸",
    "s_subway_desc": "",
    "house_info_concat": "4户合租 | 朝南-次卧 | 20M²",
    "house_labels": ["新上架", "朝南", "电梯房"],
    "BAhouse": "876369|久阳文华府邸-1室0厅0卫|松江大学城-上海|松江大学城-松江|合租|1100",
    "GaName": "久阳文华府邸 1室0厅0卫"
  }, {
    "house_id": "1182127",
    "lan_co_id": 2871,
    "comprehensive_score": "5.0",
    "score_number": 100,
    "fangdong_say": "",
    "is_qiye_fangdong": 0,
    "fuwu_labels": [],
    "fangdong_chnuo": "",
    "publish_date": "今天发布",
    "is_true_photo": 1,
    "house_photo_num": 5,
    "is_proxy_served": null,
    "area_list": "松江-松江大学城",
    "title_name": "合租-星辰园",
    "is_monthly_pay": 1,
    "month_rent": 1650,
    "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/1183/1182127/oss_5a30f2fcbeaa0.jpg@!380_280.png",
    "subdistrict_name": "星辰园",
    "s_subway_desc": "9号线(松江大学城站)，步行7分钟",
    "house_info_concat": "8户合租 | 朝东南-主卧 | 25M²",
    "house_labels": ["新上架", "近地铁", "主卧", "非一楼"],
    "BAhouse": "1182127|星辰园-1室0厅0卫|松江大学城-上海|松江大学城-松江|合租|1650",
    "GaName": "星辰园 1室0厅0卫"
  }]
const GoodRooms = (props) => {
  return (
    <div className='goodRoom'>
      <div className={"title " + (props.title? "" :"hide")}>{props.title}</div>
      {
        lists.map((v, i) => (
          <div className="goodRoom_list" key={v.house_id}>
            <Link to="/house-detail">
              <div className="room clearfix">
              <div className="room_left fl">
                <div className="img">
                  <img src={RES_URL + 'image/room.png'} alt=""/>
                  <div className="pics">
                    <span>实拍</span>
                    <span>13图</span>
                  </div>
                </div>
                <div className="star_bg">
                  <div className="star">
                    <img src={require('../../assets/image/star.png')} alt=""/>
                  </div>
                  <span>4.7分</span>
                </div>
              </div>
              <div className="room_right fl">
                <div className="name">
                  保利 御樽苑
                </div>
                <div className="price">
                  ￥1200
                  <img src={require('../../assets/image/month_pay.png')} alt=""/>
                </div>
                <div className="info text-grey">
                  5户合租 | 朝西南-次卧 | 18M²
                </div>
                <div className="site text-grey">
                  松江-松江老城
                </div>
                <div className="category">
                  <span>新上架</span><span>非一楼</span>
                  <div className="text-grey fr">今天发布</div>
                </div>
              </div>
            </div>
            </Link>
          </div>))
      }
    </div>
  );
};
GoodRooms.propTypes = {
  lists: PropTypes.array,
  title:PropTypes.string
};
GoodRooms.defaultProps = {
  lists: [],
  title:''
};
export default GoodRooms;