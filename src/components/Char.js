import React, { Component } from "react";
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

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
      <button style={{
          opacity: isDragging ? 0.2 : 1,
          color: color
        }}
        data-index={index}
      >
        {char}
      </button>
    ))
  }
}                 

export default DropTarget(Types.CHAR, charTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource(Types.CHAR, charSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Char));
