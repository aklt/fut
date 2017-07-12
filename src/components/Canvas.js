
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

    return (
      <div className="canvas">
        <canvas
          width={200}
          height={200}
          ref={(el) => {this.canvasEl = el}}
        >
        </canvas>
      </div>
    )
  }

  paintSprite() {
    const { 
      chars,
      width,
      height
    } = this.props;
    if (this.context2d) {
      var sz = this.canvasEl.width
      var scale = sz / 36;
      var x = sz / (2 * scale)
      var y = sz / (2 * scale)
      var ctx = this.context2d
      ctx.save();
      ctx.scale(scale, scale);
      ctx.clearRect(0, 0, width, height);
      var res = futSpriteMinify(chars, {x, y, sz});
      futSprite.paint(this.context2d, res.chars, res.pal.split(/\|/), futSprite.parse(res.sprites), x, y);
      ctx.restore();
    }
  }

  componentDidUpdate() {
    this.paintSprite();
  }

  componentDidMount() {
    console.warn('mount', this.context2d)
    if (!this.context2d) {
      this.context2d = this.canvasEl.getContext('2d');
    }
    this.paintSprite();
  }
}

export default Canvas;
