import React, {Component} from 'react';

let map = null;

const style = {
  container:{
    width:'100%',
    height:'4rem',
  }
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    // map = new AMap.Map('container',{
    //   zoom: 10,
    //   center: [116.39,39.9]
    // });
  }

  render() {
    return (<div id="container" style={style.container}>

    </div>)
  }
}

export default Map