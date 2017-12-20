import React, {Component} from 'react';
import {Icon} from 'antd-mobile'
import '../assets/css/search.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {storeSearchList} from '../store/actions/common'

let list = ["上大路", "金桥", "魔方公寓", "七宝", "五角场", "徐汇", "川沙", "公寓", "张江", "宝山", "九亭"];

@connect(state => ({searchList: state.reducers.common.searchList,}), dispatch => bindActionCreators({storeSearchList}, dispatch))
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      btnControl: true
    }
  }

  changeInput = (e) => {
    this.setState({search: e.target.value}, () => {
      if (this.state.search) this.setState({btnControl: false});
      if (!this.state.search && !this.state.btnControl) this.setState({btnControl: true});
    })
  };

  cancel = () => {
    this.props.history.back();
  };

  search = () => {

  };

  changeSearch(name) {
    this.setState({search: name}, () => {
      this.search()
    });
  }

  render() {
    return (<div className="container">
      {/*顶部搜索栏*/}
      <div className="search_top">
        <div className="search">
          <Icon type='search' size='lg'/>
          <input type='text' value={this.state.search} onInput={this.changeInput} placeholder='输入区域，小区搜索房源'/>
        </div>
        <span className={this.state.btnControl ? "" : "hide"} onClick={this.cancel}>取消</span>
        <span className={this.state.btnControl ? "hide" : ""} onClick={this.search}>搜索</span>
      </div>
      {/*热门搜索*/}
      <div className="most_search">
        <div className="title">热门搜索</div>
        <ul>
          {
            list.map((v, i) => (<li key={i} onClick={this.changeSearch.bind(this, v)}>
              {v}
            </li>))
          }
        </ul>
      </div>
      {/*历史搜索*/}
      <div className="most_search">
        <div className="title">历史搜索 <img src={require('../assets/image/delete.png')} alt=""/></div>
        <ul>
          {
            this.props.searchList.map((v, i) => (<li key={i} onClick={this.changeSearch.bind(this, v)}>
              {v}
            </li>))
          }
        </ul>
      </div>
    </div>)
  }
}

export default Search