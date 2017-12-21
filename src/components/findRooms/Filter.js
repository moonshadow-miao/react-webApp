import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

@connect(state => ({}))
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps({path}) {

  }

  componentWillUnmount() {

  }

  componentDidMount() {


  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

Filter.propTypes = {
  setSite: PropTypes.func,
  site: PropTypes.number,
  container: PropTypes.string.isRequired
};
export default Filter