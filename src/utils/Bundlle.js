import React, { Component } from "react";
import {connect} from 'react-redux'
import {setSession,getSession} from "./index";

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
      if(actions && actions.component === undefined){
        for(let k in actions){
          await this.props.dispatch(actions[k]());
        }
      }
      if(actions && actions.component && getSession(actions.component) === null){
        for(let k in actions){
          if(k !== 'component') await this.props.dispatch(actions[k]());
        }
        setSession(actions.component,'rendered')
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