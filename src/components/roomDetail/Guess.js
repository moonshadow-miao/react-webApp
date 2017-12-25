import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/RecommendRoom.less'
import {Link} from 'react-router-dom'
let lists = [{}, {}, {},{}]
const RecommendRoom = (props) => {
  return (
    <div className='guess clearfix'>
      {
        lists.map((v, i) => (<li key={i} className="room fl">
          <Link to="/house-detail">
            <div className="room_img"><img
              src='https://cdn.baletoo.cn/Uploads/housephoto/1567/1566294/oss_5a1f7565c8c73.jpg@!380_280.png'
              alt=""/></div>
            <div className="room_name">{'保利御樽苑'}</div>
            <div className="price">￥{'2200'}</div>
          </Link>
        </li>))
      }
    </div>
  );
}

RecommendRoom.propTypes = {
  lists: PropTypes.array,
}
export default RecommendRoom;