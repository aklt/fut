import React, {Component} from 'react';
import PropTypes from 'prop-types';

import futSprite from '../sprite';
import futSpriteMinify from '../sprite-minify';

import './Canvas.css';

class Canvas extends Component {
  static propTypes = {};

  render() {
    console.warn('Canvas', this.props);

    return (
      <div className="canvas">
        <canvas
          width={200}
          height={200}
          ref={el => {
            this.canvasEl = el;
          }}
        />
      </div>
    );
  }

  paintSprite() {
    const {chars, width, height} = this.props;
    if (this.context2d) {
      var sz = this.canvasEl.width;
      var scale = sz / 36;
      var x = sz / (2 * scale);
      var y = sz / (2 * scale);
      var ctx = this.context2d;
      ctx.save();
      ctx.scale(scale, scale);
      ctx.clearRect(0, 0, width, height);
      var res = futSpriteMinify(chars);
      var [resChars, resPal, resSprites] = res.split(/\t/);
      futSprite.paint(
        this.context2d,
        resChars,
        resPal.split(/\|/),
        futSprite.parse(resSprites),
        x,
        y,
      );
      var f = new futSprite.Fut(resChars, resPal, resSprites);
      console.warn('FF', f);
      ctx.restore();
    }
  }

  componentDidUpdate() {
    this.paintSprite();
  }

  componentDidMount() {
    console.warn('mount', this.context2d);
    if (!this.context2d) {
      this.context2d = this.canvasEl.getContext('2d');
    }
    this.paintSprite();
  }
}

export default Canvas;
