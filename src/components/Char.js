import React, { Component } from "react";
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';

import './Char.css';

export const Types = {
  CHAR: 'Char'
}

const charSource = {
  beginDrag (props) {
    return {
      id: props.id,
      index: props.index
    }
  },
  endDrag (props, monitor, component) {
    if (monitor.didDrop()) {
      const res = monitor.getDropResult();
      props.moveChar(res.dragIndex, res.hoverIndex);
    }
  }
}

const charTarget = {
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    return {
      dragIndex,
      hoverIndex
    }
  }
}

class Char extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    char: PropTypes.string.isRequired,
    moveChar: PropTypes.func.isRequired
  }

  render() {
    const {
      char,
      color,
      connectDragSource,
      connectDropTarget,
      index,
      isDragging,
    } = this.props;
    return connectDragSource(connectDropTarget(
      <button className={cn({
        char: true,
        selected: this.selected
          })} style={{
          opacity: isDragging ? 0.2 : 1,
          color: color
        }}
        data-index={index}
        ref={(el) => { this.elButton = el}}
      >
        {char}
      </button>
    ))
  }

  select(on) {
    this.selected = !!on;
  }

  focus() {
    if (this.elButton) {
      this.elButton.focus();
    }
  }

  componentDidMount() {
    if (this.props.focus) this.focus()
  }
  componentDidUpdate() {
    if (this.props.focus) this.focus()
  }
}

export default DropTarget(Types.CHAR, charTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource(Types.CHAR, charSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Char));
