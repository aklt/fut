import React, { Component } from "react";

import "./CharPalette.css";

class CharPalette extends Component {
  displayName: "CharPalette";

  onClick = (ev) => {
    ev.preventDefault();
    console.warn('click', ev.target)
  }

  render() {
    return (
      <div className="char-palette" onClick={this.onClick}>
        <button>A</button>
        <button>B</button>
        <button>C</button>
        <button>D</button>
      </div>
    );
  }
}

export default CharPalette;
