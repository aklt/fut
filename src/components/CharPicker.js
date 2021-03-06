/* global fut */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import cn from 'classnames';

import StaticContainer from "react-static-container";

import "./CharPicker.css";

class CharPicker extends Component {
  displayName: "CharPicker";

  static propTypes = {
    onSelectChar: PropTypes.func
  }

  static defaultProps = {
    onSelectChar: (ch) => {
      console.warn('onSelectChar', ch);
    }
  }
  componentDidMount() {
    const { onSelectChar } = this.props;
    fut.charPicker(this.el, (selectedChar) => {
      onSelectChar(selectedChar);
    });
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <StaticContainer>
        <div className="char-selector"
          ref={(el) => {
            this.el = el;
          }}>
        </div>
      </StaticContainer>
    );
  }
}

export default CharPicker;
