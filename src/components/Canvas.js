import React, { Component } from 'react'
import PropTypes from 'prop-types'

import futSprite from '../sprite'
import futSpriteMinify from '../sprite-minify'

import './Canvas.css'

type CanvasProps = {
  sliderChange: func,
  markChar: func,
  foo: func
}

class Canvas extends Component {
  props: CanvasProps

  constructor(props) {
    super(props)
    this.state = {}

    this.changeX = props.sliderChange('x')
    this.changeY = props.sliderChange('y')

    this.changeSx = props.sliderChange('sx')
    this.changeSy = props.sliderChange('sy')

    this.changeR = props.sliderChange('r')
    this.changeRot = p1 => {
      var angle = Math.atan2(p1.y - 18, p1.x - 18) + Math.PI
      var rot = Math.max(Math.round(36 * angle / (2 * Math.PI)), 0)
      this.changeR(rot)
    }
  }

  pos(ev) {
    var e = ev.nativeEvent
    var x = Math.round(36 * e.offsetX / ev.target.width)
    var y = Math.round(36 * e.offsetY / ev.target.height)
    return { x, y }
  }

  mouseDown = ev => {
    this.hasMouseDown = true
    var p1 = this.pos(ev)
    this.setState({
      startX: p1.x,
      staryY: p1.y
    })
    if (ev.shiftKey) {
      this.changeRot(p1)
    }
  }

  mouseUp = ev => {
    this.hasMouseDown = false
    console.warn(ev)
  }

  mouseMove = ev => {
    if (this.hasMouseDown) {
      this.makeChange(ev)
    }
  }

  makeChange = ev => {
    var p1 = this.pos(ev)
    if (ev.ctrlKey) {
      this.changeSx(p1.x)
      this.changeSy(p1.y)
    } else if (ev.shiftKey) {
      this.changeRot(p1)
    } else {
      this.changeX(p1.x)
      this.changeY(p1.y)
    }
  }

  render() {
    console.warn('Canvas', this.props)
    return (
      <div className="canvas">
        <canvas
          width={200}
          height={200}
          ref={el => {
            this.canvasEl = el
          }}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseMove={this.mouseMove}
        />
      </div>
    )
  }

  paintSprite() {
    const { chars, activeIndex, width, height } = this.props
    if (this.context2d) {
      var sz = this.canvasEl.width
      var scale = sz / 36
      var x = sz / (2 * scale)
      var y = sz / (2 * scale)
      var ctx = this.context2d
      ctx.save()
      ctx.scale(scale, scale)
      ctx.clearRect(0, 0, width, height)
      var res = futSpriteMinify(chars)
      var [resChars, resPal, resSprites] = res.split(/\t/)
      futSprite.paint(
        this.context2d,
        resChars,
        resPal.split(/\|/),
        futSprite.parse(resSprites),
        x,
        y
      )
      //      var f = new futSprite.Fut(resChars, resPal, resSprites);
      ctx.restore()
    }
  }

  componentDidUpdate() {
    this.paintSprite()
  }

  componentDidMount() {
    if (!this.context2d) {
      this.context2d = this.canvasEl.getContext('2d')
    }
    this.paintSprite()
  }
}

export default Canvas
