
import update from 'immutability-helper';
import getId from '../../getId'

export const CHAR_DROP = 'fut/futApp/CHAR_DROP';
export const CHAR_CLICK = 'fut/futApp/CHAR_CLICK';
export const CHAR_ADD = 'fut/futApp/CHAR_ADD';
export const CHAR_REMOVE = 'fut/futApp/CHAR_REMOVE';
export const PICK_COLOR = 'fut/futApp/PICK_COLOR';
export const PICK_CHAR = 'fut/futApp/PICK_CHAR';
export const SLIDER_CHANGE = 'fut/futApp/SLIDER_CHANGE';

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

export function charAdd () {
  return {
    type: CHAR_ADD
  }
}

export function charRemove (i) {
  return {
    type: CHAR_REMOVE
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

export function sliderChange (slider, value) {
  return {
    type: SLIDER_CHANGE,
    slider,
    value
  }
}

var defaultChar = {
  x: 18,
  y: 18,
  sz: 18,
  sx: 18,
  sy: 18,
  r: 0,
}

function makeChar (ch) {
  if (typeof ch === 'string') {
    return Object.assign({}, defaultChar, {
      char: ch,
      id: getId('char')
    })
  }
  return Object.assign({}, defaultChar, ch, {id: getId('char')});
}

// TODO Set initial state in UI
const initialState = {
  activeIndex:  0,
  chars: [ 'C' ].map(makeChar)
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
    case CHAR_ADD:
      let end = state.chars.length;
      state = update(state, {chars: {
        $push: [
          makeChar(state.chars[state.activeIndex])
        ]
      }});
      return update(state, {$merge: {activeIndex: end}});
    case CHAR_REMOVE:
      if (state.chars.length === 1) return state;
      let active = state.activeIndex;
      state = update(state, {chars: {
        $splice: [
          [state.activeIndex, 1]
        ]
      }});
      if (active > 0) active -= 1;
      else active = 0
      return update(state, {$merge: {activeIndex: active}});
    case PICK_COLOR:
      return update(state, {chars: {
        [state.activeIndex]: {$merge: {color: action.color}}
      }})
    case PICK_CHAR:
      return update(state, {chars: {
        [state.activeIndex]: {$merge: {char: action.char}}
      }})
  case SLIDER_CHANGE:
    return update(state, {chars: {
      [state.activeIndex]: {$merge: {[action.slider]: action.value}}
    }})
    default:
      return state;
  }
}

