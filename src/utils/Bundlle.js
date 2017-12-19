import React, { Component } from "react";
import {connect} from 'react-redux'

@connect()
export default function asyncComponent(importComponent,actions,cb) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      if(actions){
        for(let k in actions){
          await this.props.dispatch(actions[k]());
        }
      }
      cb && cb();
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}