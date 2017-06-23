
/* global fut */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import StaticContainer from "react-static-container";

import "./ColorPicker.css";

class ColorPicker extends Component {
  displayName: "ColorPicker";

  static propTypes = {
    onPickColor: PropTypes.func
  }

  static defaultProps = {
    onPickColor: (color) => {
      console.warn('onPickColor', color);
    }
  }

  componentDidMount() {
    const { onPickColor } = this.props;
    fut.colorPicker(this.el, (newColor) => {
      onPickColor(newColor);
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
