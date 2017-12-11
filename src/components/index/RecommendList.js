import React, {Component} from 'react';
import {Button,Icon} from 'antd-mobile';
import _map from 'lodash/map'

let list = [{},{}]

class RecommendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        {
          list.map((v,i)=>(
            <div className="recommend_list">
                <div className="title">

                </div>
            </div>))
        }

      </div>
    );
  }
}

export default RecommendList;