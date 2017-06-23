
import update from 'immutability-helper';
import getId from '../../getId'

export const CHAR_DROP = 'fut/futApp/CHAR_DROP';
export const CHAR_CLICK = 'fut/futApp/CHAR_CLICK';
export const PICK_COLOR = 'fut/futApp/PICK_COLOR';
export const PICK_CHAR = 'fut/futApp/PICK_CHAR';

export function charDrop (dragIndex, hoverIndex, dragChar) {
  return {
    type: CHAR_DROP,
    dragIndex,
    hoverIndex,
    dragChar
  }
}

export function charClick (index) {
  return {
    type: CHAR_CLICK,
    index: index
  }
}

export function pickColor (color) {
  return {
    type: PICK_COLOR,
    color
  }
}

export function pickChar (char) {
  return {
    type: PICK_CHAR,
    char
  }
}

// TODO Set initial state in UI
const initialState = {
  activeIndex:  0,
  chars: [ 'A', 'B', 'C' ].map(ch => ({
    id: getId('char'),
    char: ch
  }))
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHAR_DROP:
      state = update(state, {$merge: {activeIndex: action.hoverIndex}});
      return update(state, {chars: {
        $splice: [
          [action.dragIndex, 1],
          [action.hoverIndex, 0, action.dragChar]
        ]}});
    case CHAR_CLICK:
      return update(state, {$merge: {activeIndex: action.index}});
    case PICK_COLOR:
      return update(state, {chars: {
        [state.activeIndex]: {$merge: {color: action.color}}
      }})
    case PICK_CHAR:
      return update(state, {chars: {
        [state.activeIndex]: {$merge: {char: action.char}}
      }})
    default:
      return state;
  }
}

