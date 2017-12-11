import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import _map from 'lodash/map'

let list = [
  {
  "house_id": "1467393",
  "lan_co_id": 5902,
  "fangdong_chnuo": "",
  "publish_date": "今天发布",
  "is_true_photo": 0,
  "house_photo_num": 5,
  "is_proxy_served": null,
  "area_list": "静安-西藏北路",
  "title_name": "合租-申桂公寓",
  "is_monthly_pay": 1,
  "month_rent": 3000,
  "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/1468/1467393/oss_5a20a644746b2.png@!380_280.png",
  "subdistrict_name": "申桂公寓",
  "s_subway_desc": "3号线(东宝兴路站)，步行4分钟",
  "house_info_concat": "5户合租 | 朝南-次卧 | 20M²",
  "house_labels": ["新上架", "近地铁", "朝南", "独卫", "电梯房", "非一楼"],
  "BAhouse": "1467393|申桂公寓-1室0厅1卫|西藏北路-上海|西藏北路-静安|合租|3000",
  "GaName": "申桂公寓 1室0厅1卫"
},
  {
  "house_id": "1536749",
  "lan_co_id": 3958,
  "fangdong_chnuo": "",
  "publish_date": "今天发布",
  "is_true_photo": 1,
  "house_photo_num": 10,
  "is_proxy_served": null,
  "area_list": "浦东-外高桥",
  "title_name": "合租-阳光欧洲城三期（源水新墅）",
  "is_monthly_pay": 1,
  "month_rent": 1800,
  "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/1537/1536749/oss_5a238d124005a.jpg@!380_280.png",
  "subdistrict_name": "阳光欧洲城三期（源水新墅）",
  "s_subway_desc": "",
  "house_info_concat": "19户合租 | 朝南-次卧 | 20M²",
  "house_labels": ["新上架", "朝南", "独卫", "非一楼"],
  "BAhouse": "1536749|阳光欧洲城三期（源水新墅）-1室0厅1卫|外高桥-上海|外高桥-浦东|合租|1800",
  "GaName": "阳光欧洲城三期（源水新墅） 1室0厅1卫"
},
  {
  "house_id": "580779",
  "lan_co_id": 3262,
  "fangdong_chnuo": "",
  "publish_date": "今天发布",
  "is_true_photo": 1,
  "house_photo_num": 11,
  "is_proxy_served": null,
  "area_list": "嘉定-南翔",
  "title_name": "合租-浏翔花苑（蕰北公路2371弄）",
  "is_monthly_pay": 1,
  "month_rent": 1300,
  "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/581/580779/oss_5a2e1d08cd16b.jpg@!380_280.png",
  "subdistrict_name": "浏翔花苑（蕰北公路2371弄）",
  "s_subway_desc": "",
  "house_info_concat": "8户合租 | 朝南-次卧 | 20M²",
  "house_labels": ["新上架", "朝南", "独卫", "非一楼"],
  "BAhouse": "580779|浏翔花苑（蕰北公路2371弄）-1室0厅1卫|南翔-上海|南翔-嘉定|合租|1300",
  "GaName": "浏翔花苑（蕰北公路2371弄） 1室0厅1卫"
},
  {
  "house_id": "580810",
  "lan_co_id": 3262,
  "fangdong_chnuo": "",
  "publish_date": "今天发布",
  "is_true_photo": 1,
  "house_photo_num": 8,
  "is_proxy_served": null,
  "area_list": "嘉定-南翔",
  "title_name": "合租-永乐公寓",
  "is_monthly_pay": 1,
  "month_rent": 1800,
  "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/581/580810/oss_5947bca6ba6ee.jpg@!380_280.png",
  "subdistrict_name": "永乐公寓",
  "s_subway_desc": "",
  "house_info_concat": "9户合租 | 朝南-主卧 | 25M²",
  "house_labels": ["新上架", "主卧", "朝南", "独卫", "非隔断"],
  "BAhouse": "580810|永乐公寓-1室0厅1卫|南翔-上海|南翔-嘉定|合租|1800",
  "GaName": "永乐公寓 1室0厅1卫"
},
  {
  "house_id": "603023",
  "lan_co_id": 3026,
  "fangdong_chnuo": "",
  "publish_date": "今天发布",
  "is_true_photo": 1,
  "house_photo_num": 9,
  "is_proxy_served": null,
  "area_list": "浦东-北蔡",
  "title_name": "合租-德锦苑",
  "is_monthly_pay": 1,
  "month_rent": 1850,
  "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/604/603023/oss_5a0d5f8100991.jpg@!380_280.png",
  "subdistrict_name": "德锦苑",
  "s_subway_desc": "",
  "house_info_concat": "4户合租 | 次卧 | 18M²",
  "house_labels": ["新上架", "独卫", "电梯房", "非一楼"],
  "BAhouse": "603023|德锦苑-1室0厅1卫|北蔡-上海|北蔡-浦东|合租|1850",
  "GaName": "德锦苑 1室0厅1卫"
},
  {
  "house_id": "691489",
  "lan_co_id": 1518,
  "fangdong_chnuo": "",
  "publish_date": "今天发布",
  "is_true_photo": 1,
  "house_photo_num": 21,
  "is_proxy_served": null,
  "area_list": "闵行-古美罗阳",
  "title_name": "合租-蓝色港湾",
  "is_monthly_pay": 1,
  "month_rent": 1850,
  "house_main_image": "https://cdn.baletoo.cn/Uploads/housephoto/692/691489/oss_58aea7035f097.jpg@!380_280.png",
  "subdistrict_name": "蓝色港湾",
  "s_subway_desc": "",
  "house_info_concat": "4户合租 | 朝北-次卧 | 16M²",
  "house_labels": ["新上架", "独卫", "非一楼"],
  "BAhouse": "691489|蓝色港湾-1室1厅1卫|古美罗阳-上海|古美罗阳-闵行|合租|1850",
  "GaName": "蓝色港湾 1室1厅1卫"
}];

let lists = [{tag:'0',list:list},{tag:'1',list:list},{tag:'2',list:list}]

let tag = {
  '0':'精选独卫房',
  '1':'精品一室户',
  '2':'朝南阳光房'
}

class RecommendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {
          lists.map((v, i) => (
            <div className="recommend_list" key={i}>
              <div className="title">
                <h3 className='fl'>{tag[v.tag]}</h3>
                <div className='fr'>
                  <span>查看更多</span>
                  <Icon type='right' size='lg' />
                </div>
              </div>
              <div className='rooms'>
                <ul className="room_list">
                  {
                    v.list.length && v.list.map((v,i)=>(
                      <li key={i} className="room">
                        <div className="room_img"><img src='https://cdn.baletoo.cn/Uploads/housephoto/1567/1566294/oss_5a1f7565c8c73.jpg@!380_280.png' alt=""/></div>
                        <div className="room_name">{'dddddd'}</div>
                        <div className="price">￥{'2200'}</div>
                      </li>))
                  }
                </ul>
              </div>
            </div>))
        }

      </div>
    );
  }
}

export default RecommendList;