
import React, { Component } from "react";
import RcSlider from 'rc-slider';

import getId from '../getId';

import 'rc-slider/assets/index.css';

class Slider extends Component {
  render () {
    const id = getId('slider')
    return (
      <div htmlFor={id}>
        <span>Name</span>
        <RcSlider id={id}/>
      </div>
    )
  }
}

export default Slider;
