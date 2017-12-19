import React, {Component} from 'react';
import PropTypes from 'prop-types';

let timer = null;
function throttle() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    this.setState({
      show: document.body.scrollTop > 200
    });
  }, 100);
}

class GoToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.site > 200
    };
  }

  componentWillUnmount() {
    this.props.setSite(document.body.scrollTop);
    document.body.removeEventListener("scroll", throttle.bind(this), false);
  }

  componentDidMount() {
    document.body.scrollTop = this.props.site;
    document.body.addEventListener("scroll", throttle.bind(this),false);
  }

  goTop() {
    document.body.scrollTop = 0
  }

  render() {
    return (
      <div className={this.state.show ? 'goTop' : 'goTop hide'} onClick={this.goTop}>
        <img src="http://localhost:3030/image/top.png" alt="暂无图片"/>
      </div>
    )
  }
}

GoToTop.propTypes = {
  setSite: PropTypes.func,
  site: PropTypes.number
}


export default GoToTop