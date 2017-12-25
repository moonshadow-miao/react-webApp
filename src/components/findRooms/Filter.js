import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Range} from 'antd-mobile'
import {updateFilterOptions} from '../../store/actions/common'
import '../../assets/css/filter.less'
import {search} from "../../mock/findRooms";

let timer = null;
const rem = parseInt(document.querySelector('html').style.fontSize);

function throttle() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    this.setState({
      isFixed: document.querySelector('.findRooms').scrollTop > 0.8 * rem,
    });
  }, 100);
}

const style_slider = {
  width: '.6rem',
  height: '.6rem',
  position: 'absolute',
  top: '0',
  borderRadius: '50%',
  boxShadow: '1px 1px 2px 1px #999',
  background: '#fff',
  border: 'none'
}
const style_line = {height: '.06rem'};
const initTabs = ['位置', '租金', '户型', '更多'];

@connect(state => ({filterOptions: state.reducers.common.filterOptions}), dispatch => bindActionCreators({updateFilterOptions}, dispatch))
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTabs: -1,       // 控制显示选择器指定的面板,
      isFixed: false,     // 控制选择器导航栏的是否固定定位
      isShowPanel: false, // 控制选择器的面板部分整体的显示和隐藏
      position: '0',       // 控制区域选择(区域/地铁)
      sub_region: [],      // 区域列表右侧
      region_index: -1,    // 控制区域选择左侧
      sub_region_index: -1, // 控制区域选择右侧
      rent_index: -1,       // 控制价格卡片选择
      custom_price_top: 0,  // 控制自定义价格上限
      custom_price_bottom: 5000,  // 控制自定义价格下限
      sub_layout: [],       // 户型选择右侧列表
      layout_index: -1,    // 控制户型选择左侧
      sub_layout_index: -1,    // 控制户型选择右侧
      moreType: '0',       // 控制更多选择(排序/特色)
      sort_index: -1,     // 控制排序的选择
      special: []    // 控制特色的选择
    };
  }

  componentWillUnmount() {
    document.querySelector('.findRooms').removeEventListener("scroll", throttle.bind(this), false);
  }

  componentDidMount() {
    document.querySelector('.findRooms').addEventListener("scroll", throttle.bind(this), false);
  }

  showPanel(index) {
    this.setState({
      showTabs: index,
      isFixed: true,
      isShowPanel: true
    })
  }

  hidePanel = () => {
    this.setState({
      isFixed: true,
      isShowPanel: false,
      showTabs: -1,
    })
  };

  showPosition(type) {
    this.setState({position: type});
  }

  changeRegionList(list, name, index) {
    this.setState({sub_region: list, region_index: index, sub_region_index: -1});
    index === -1 ? this.props.updateFilterOptions({index: 0, value: '位置', id: ''}) :
      this.props.updateFilterOptions({index: 0, value: name, id: ''})
  }

  selectRegion(region, index) {
    this.setState({sub_region_index: index});
    if (index !== -1) this.props.updateFilterOptions({index: 0, value: region.name, id: region.id})
  }

  selectRent(rent, index) {
    this.setState({rent_index: index})
    index === -1 ? this.props.updateFilterOptions({index: 1, value: '租金', id: ''}) :
      this.props.updateFilterOptions({index: 1, value: rent.name, id: rent.id})
  }

  changeCustom(arr) {
    this.setState({
      custom_price_top: arr[0],
      custom_price_bottom: arr[1]
    })
  }

  changeLayoutList(list, name, index) {
    this.setState({sub_layout: list, layout_index: index, sub_layout_index: -1});
    index === -1 ? this.props.updateFilterOptions({index: 2, value: '户型', id: ''}) :
      this.props.updateFilterOptions({index: 2, value: name, id: ''})
  }

  selectLayout(layout, index) {
    this.setState({sub_layout_index: index});
    if (index !== -1) this.props.updateFilterOptions({index: 2, value: layout.name, id: layout.id})
  }

  changeMoreType(type) {
    this.setState({moreType: type})
  }

  selectSort(name, index,id = '') {
    this.setState({sort_index: index});
    this.props.updateFilterOptions({index: 3, value: name, id: id})
  }

  selectSpecial(sort) {
    let index = this.state.special.indexOf(sort),
      newArray = Object.assign([], this.state.special);
    index === -1 ? newArray.push(sort) : newArray.splice(index, 1);
    this.setState({special: newArray})
  }

  selectCustomPrice = (e) => {
    let isSelect = e.target.className.indexOf('active') !== -1,
      price = this.state.custom_price_top + '-' + this.state.custom_price_bottom;
    if (isSelect) this.props.updateFilterOptions({index: 1, value: price, id: ''})
  };

  clearSpecial = () => {
    this.setState({special: []})
  };

  sureSpecial = () => {
    this.props.updateFilterOptions({index: 3, value: '更多', id: '',special:this.state.special})
  };

  render() {
    return (
      <div className={'filter'}>
        <div className={"tab-wrapper" + (this.state.isFixed ? ' fixed' : '')}>
          {
            this.props.filterOptions.map((v, i) => (
              <div className='tab' key={i}
                   onClick={this.showPanel.bind(this, i + 1)}>
                <span
                  className={"tab-text " + (this.state.showTabs === (i + 1) || this.props.filterOptions[i].value !== initTabs[i] ? 'active' : '')}>{v.value}</span>
                <span
                  className={this.state.showTabs === (i + 1) ? "icon-angle-up arrow" : "icon-angle-down arrow"}> </span>
              </div>
            ))
          }
        </div>
        <div className={"panels" + (this.state.isShowPanel ? ' show_panel' : 'hide')}>
          {/*区域和地铁*/}
          <div className={(this.state.showTabs === 1 ? '' : 'hide') + ' panel position'}>
            <div className="subTabs">
              <div className='subTab' onClick={this.showPosition.bind(this, '0')}><span
                className={this.state.position === '0' ? 'active' : ''}>区域</span></div>
              <div className='subTab' onClick={this.showPosition.bind(this, '1')}><span
                className={this.state.position === '1' ? 'active' : ''}>地铁</span></div>
            </div>
            <div className="subPanels">
              <div className={(this.state.position === '0' ? '' : 'hide') + ' region'}>
                <div className={'subPanel'}>
                  <ul className="left">
                    <li className={'sub_region ' + (this.state.region_index === -1 ? 'active' : '')}
                        onClick={this.changeRegionList.bind(this, [], -1)}>全部
                    </li>
                    {
                      search.data.region.map((v, i) => (
                        <li key={'region' + i}
                            className={'sub_region ' + (this.state.region_index === i ? 'active' : '')}
                            onClick={this.changeRegionList.bind(this, v.rightList, v.name, i)}>
                          {v.name}
                        </li>))
                    }
                  </ul>
                  <ul className="right">
                    {
                      this.state.sub_region.length === 0 ? null :
                        <li className={'sub_region ' + (this.state.sub_region_index === -1 ? 'active' : '')}
                            onClick={this.selectRegion.bind(this, '', -1)}>全部</li>
                    }
                    {
                      this.state.sub_region.map((v, i) => (
                        <li key={'sub_region' + i} onClick={this.selectRegion.bind(this, v, i)}
                            className={'sub_region ' + (this.state.sub_region_index === i ? 'active' : '')}>{v.name}</li>))
                    }
                  </ul>
                </div>
              </div>
              <div className={(this.state.position === '1' ? '' : 'hide') + ' region'}>
                <div className={'subPanel'}>
                  <ul className="left">
                    <li className={'sub_region ' + (this.state.region_index === -1 ? 'active' : '')}
                        onClick={this.changeRegionList.bind(this, [], -1)}>全部
                    </li>
                    {
                      search.data.metro.map((v, i) => (
                        <li key={'region' + i}
                            className={'sub_region ' + (this.state.region_index === i ? 'active' : '')}
                            onClick={this.changeRegionList.bind(this, v.rightList, v.name, i)}>
                          {v.name}
                        </li>))
                    }
                  </ul>
                  <ul className="right">
                    {
                      this.state.sub_region.length === 0 ? null :
                        <li className={'sub_region ' + (this.state.sub_region_index === -1 ? 'active' : '')}
                            onClick={this.selectRegion.bind(this, '', -1)}>全部</li>
                    }
                    {
                      this.state.sub_region.map((v, i) => (
                        <li key={'sub_region' + i} onClick={this.selectRegion.bind(this, v, i)}
                            className={'sub_region ' + (this.state.sub_region_index === i ? 'active' : '')}>{v.name}</li>))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/*租金*/}
          <div className={(this.state.showTabs === 2 ? '' : 'hide') + ' panel rent'}>
            <div className='options'>
              <div className={"option " + (this.state.rent_index === -1 ? 'active' : '')}
                   onClick={this.selectRent.bind(this, '', -1)}>不限
              </div>
              {
                search.data.rent.map((v, i) => (
                  <div className={"option " + (this.state.rent_index === i ? 'active' : '')}
                       onClick={this.selectRent.bind(this, v, i)} key={'rent' + i}>
                    {v.name}
                  </div>))
              }
            </div>
            <div className="custom clearfix">
              <span>自定义价格</span>
              (单位: 元)
              <span
                className={'sure fr' + (this.state.custom_price_top === 0 && this.state.custom_price_bottom === 5000 ? '' : ' active')}
                onClick={this.selectCustomPrice}>确定</span>
            </div>
            <div
              className='custom_price'>{(this.state.custom_price_top === 0 && this.state.custom_price_bottom === 5000 ? '不限' : this.state.custom_price_top) + (this.state.custom_price_bottom !== 5000 ? '-' : '') + (this.state.custom_price_bottom !== 5000 ? this.state.custom_price_bottom : this.state.custom_price_top !== 0 ? '以上' : '')}</div>
            <Range
              handleStyle={[style_slider, style_slider]} style={{marginLeft: 35, marginRight: 35}}
              trackStyle={[style_line]} min={0} max={5000} defaultValue={[0, 5000]} step={100} onChange={(arr) => {
              this.changeCustom(arr)
            }} marks={{0: '0', 1000: '1000', 2000: '2000', 3000: '3000', 4000: '4000', 5000: '不限'}}/>
            <div className="ruler">

            </div>
          </div>

          {/*户型*/}
          <div className={(this.state.showTabs === 3 ? '' : 'hide') + ' panel layout position'}>
            <div className="subPanels">
              <div className='region'>
                <div className='subPanel'>
                  <ul className="left">
                    <li className={'sub_region ' + (this.state.layout_index === -1 ? 'active' : '')}
                        onClick={this.changeLayoutList.bind(this, [] ,'户型', -1)}>不限
                    </li>
                    {
                      search.data.layout.map((v, i) => (
                        <li key={'layout' + i}
                            className={'sub_region ' + (this.state.layout_index === i ? 'active' : '')}
                            onClick={this.changeLayoutList.bind(this, v.right, v.name, i)}>
                          {v.name}
                        </li>))
                    }
                  </ul>
                  <ul className="right">
                    {
                      this.state.sub_layout.length === 0 ? null :
                        <li className={'sub_region ' + (this.state.sub_layout_index === -1 ? 'active' : '')}
                            onClick={this.selectLayout.bind(this, '', -1)}>不限</li>
                    }
                    {
                      this.state.sub_layout.map((v, i) => (
                        <li key={'sub_layout' + i} onClick={this.selectLayout.bind(this, v, i)}
                            className={'sub_region ' + (this.state.sub_layout_index === i ? 'active' : '')}>{v.name}</li>))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/*更多*/}
          <div className={(this.state.showTabs === 4 ? '' : 'hide') + ' panel more position'}>
            <div className="subPanels">
              <div className='region'>
                <div className='subPanel'>
                  <ul className="left">
                    <li className={'sub_region ' + (this.state.moreType === '0' ? 'active' : '')}
                        onClick={this.changeMoreType.bind(this, '0')}>排序
                    </li>
                    <li className={'sub_region ' + (this.state.moreType === '1' ? 'active' : '')}
                        onClick={this.changeMoreType.bind(this, '1')}>特色
                    </li>
                  </ul>
                  <ul className="right">
                    <div className={this.state.moreType === '0' ? '' : 'hide'}>
                      <li className={'sub_region ' + (this.state.sort_index === -1 ? 'active' : '')}
                          onClick={this.selectSort.bind(this, '更多', -1,'')}>默认排序
                      </li>
                      {
                        search.data.sort.map((v, i) => (
                          <li key={'sort' + i} onClick={this.selectSort.bind(this, v.name, i,v.id)}
                              className={'sub_region ' + (this.state.sort_index === i ? 'active' : '')}>{v.name}</li>))
                      }
                    </div>
                    <div className={this.state.moreType === '1' ? '' : 'hide'}>
                      {
                        search.data.special.map((v, i) => (
                          <li key={'special' + i} onClick={this.selectSpecial.bind(this, v.id)}
                              className={'sub_region ' + (this.state.special.indexOf(v.id) !== -1 ? 'active' : '')}>
                            {v.name} <span
                            className={'fr circle ' + (this.state.special.indexOf(v.id) !== -1 ? 'active' : '')}> </span>
                          </li>))
                      }
                    </div>
                  </ul>
                </div>
              </div>
              <div className={(this.state.moreType === '1' ? '' : 'hide') + ' filer_footer'}>
                <span className='icon-trash' onClick={this.clearSpecial}>清空</span>
                <button onClick={this.sureSpecial}>确认</button>
              </div>
            </div>
          </div>
          <div className="mask" onClick={this.hidePanel}> </div>
        </div>
      </div>
    )
  }
}

Filter.propTypes = {};
export default Filter