import React, { Component } from "react";
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import CharPaletteChar from './CharPaletteChar';

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
    this.props.charDrop(dragIndex, hoverIndex, dragChar);
  }

  onClick = (ev) => {
    ev.preventDefault();
    this.props.charClick(ev.target.innerText);
  }

  render() {
    console.warn('charpalette', this.props);
    const { chars } = this.props;
    return (
      <div className="char-palette" onClick={this.onClick}>
        {chars.map((char, i) => (
          <CharPaletteChar
            key={char.id}
            index={i}
            id={char.id}
            char={char.char} 
            moveChar={this.moveChar}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(CharPalette);
