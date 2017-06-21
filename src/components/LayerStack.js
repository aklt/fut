
/* global fut */
import React, { Component } from "react";
import StaticContainer from "react-static-container";

import "./LayerStack.css";

class LayerStack extends Component {
  displayName: "LayerStack";
  constructor(props) {
    super(props);
    console.warn("fut", fut);
    this.props = props;
  }
  componentDidMount() {
    fut.charPicker(this.el, (change) => {
      console.warn(change);
    });
  }
  shouldComponentUpdate() {
    console.warn("should update")
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    console.warn("did update")
  }
  render() {
    return (
      <StaticContainer>
        <div className="layer-stack"
          ref={(el) => {
            this.el = el;
          }}>
        </div>
      </StaticContainer>
    );
  }
}

export default LayerStack;
