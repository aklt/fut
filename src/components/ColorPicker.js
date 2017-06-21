
/* global fut */
import React, { Component } from "react";
import StaticContainer from "react-static-container";

import "./ColorPicker.css";

class ColorPicker extends Component {
  displayName: "ColorPicker";
  constructor(props) {
    super(props);
    console.warn("ColorPicker");
  }
  componentDidMount() {
    fut.colorPicker(this.el, (change) => {
      console.warn(change);
    });
  }
  render() {
    return (
      <StaticContainer>
        <div className="color-picker"
          ref={(el) => {
            this.el = el;
          }}>
        </div>
      </StaticContainer>
    );
  }
}

export default ColorPicker;
