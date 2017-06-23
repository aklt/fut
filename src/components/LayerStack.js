
/* global fut */

import PropTypes from 'prop-types';
import React, { Component } from "react";
import StaticContainer from "react-static-container";

import "./LayerStack.css";

class LayerStack extends Component {
  displayName: "LayerStack";
  render() {
    return (
      <div className="layer-stack"
        ref={(el) => {
          this.el = el;
        }}>
      </div>
    );
  }
}

export default LayerStack;
