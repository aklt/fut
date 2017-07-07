
import React, { Component } from "react";
import PropTypes from 'prop-types';

import futSprite from '../sprite';
import futSpriteMinify from '../sprite-minify';

import './Canvas.css';


class Canvas extends Component {
  static propTypes = {
  }

  render() {
    console.warn('Canvas', this.props);
    const { 
      chars,
      width,
      height
    } = this.props;
    var res = futSpriteMinify(chars);
    console.warn('minify', chars, res)

    if (this.context2d) {
      console.warn('context', res)
      this.context2d.clearRect(0, 0, width, height);
      futSprite.paint(this.context2d, res.chars, res.pal, futSprite.parse(res.sprites), 10, 10);
    }

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
    console.warn('mount', this.context2d)
    if (!this.context2d) {
      this.context2d = this.elCanvas.getContext('2d');
    }
  }
}

export default Canvas;
