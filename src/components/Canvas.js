
import React, { Component } from "react";
import PropTypes from 'prop-types';

import futSprite from '../sprite'

import './Canvas.css';

class Canvas extends Component {
  static propTypes = {
  }

  render() {
    console.warn('Canvas', this.props);
    return (
      <div className="canvas">
        <canvas
          width={200}
          height={200}
          ref={(el) => {this.elCanvas = el}}
        >
        </canvas>
      </div>
    )
  }

  componentDidMount() {
    const { chars } = this.props.chars;
    if (!this.context) {
      this.context = this.elCanvas.getContext('2d');
    }
    // spritePaint(this.context, chars, );
  }
}

export default Canvas;
