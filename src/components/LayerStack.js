import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Char from './Char'

import './LayerStack.css'

class LayerStack extends Component {
  displayName: 'LayerStack'
  static propTypes = {
    chars: PropTypes.array.isRequired,
    charClick: PropTypes.func.isRequired,
    charDrop: PropTypes.func.isRequired,
    charAdd: PropTypes.func.isRequired,
    charRemove: PropTypes.func.isRequired
  }

  moveChar = (dragIndex, hoverIndex) => {
    const { chars } = this.props
    const dragChar = chars[dragIndex]
    if (dragIndex === hoverIndex) return
    this.props.charDrop(dragIndex, hoverIndex, dragChar)
  }

  onClick = ev => {
    ev.preventDefault()
    const index = parseInt(ev.target.dataset.index, 10)
    this.props.charClick(index)
  }

  charAdd = ev => {
    ev.stopPropagation()
    this.props.charAdd()
  }

  charRemove = ev => {
    ev.stopPropagation()
    this.props.charRemove()
  }

  render() {
    console.warn('layer-stack', this.props)
    const { chars, activeIndex } = this.props
    return (
      <div className="layer-stack" onClick={this.onClick}>
        <div className="layer-stack__buttons">
          <button onClick={this.charAdd}> + </button>
          <button onClick={this.charRemove}> - </button>
        </div>
        <div className="layer-stack__chars">
          {chars.map((char, i) => {
            var props = {}
            if (i === activeIndex) props.focus = true
            return (
              <Char
                key={char.id}
                index={i}
                id={char.id}
                char={char.char}
                color={(char.color || '#000').slice(0, 7)}
                moveChar={this.moveChar}
                {...props}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(LayerStack)
