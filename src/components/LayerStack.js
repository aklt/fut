
import React, { Component } from "react";

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
