import React, { Component } from "react";
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Char from './Char';

import "./CharPalette.css";

class CharPalette extends Component {
  displayName: "CharPalette";
  static propTypes = {
    chars: PropTypes.array.isRequired,
    charClick: PropTypes.func.isRequired,
    charDrop: PropTypes.func.isRequired
  }

  moveChar = (dragIndex, hoverIndex) => {
    const { chars } = this.props;
    const dragChar = chars[dragIndex]
    if (dragIndex === hoverIndex) return;
    this.props.charDrop(dragIndex, hoverIndex, dragChar);
  }

  onClick = (ev) => {
    ev.preventDefault();
    const index = parseInt(ev.target.dataset.index, 10);
    this.props.charClick(index);
  }

  render() {
    console.warn('charpalette', this.props);
    const { chars } = this.props;
    return (
      <div className="char-palette" onClick={this.onClick}>
        {
         chars.map((char, i) => (
          <Char
            key={char.id}
            index={i}
            id={char.id}
            char={char.char} 
            color={(char.color || '#000').slice(0, 7)}
            moveChar={this.moveChar}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(CharPalette);
