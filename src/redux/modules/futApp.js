
import update from 'immutability-helper';
import getId from '../../getId'

export const CHAR_DROP = 'fut/futApp/CHAR_DROP';
export const CHAR_CLICK = 'fut/futApp/CHAR_CLICK';

export function charDrop (dragIndex, hoverIndex, dragChar) {
  return {
    type: CHAR_DROP,
    dragIndex,
    hoverIndex,
    dragChar
  }
}

export function charClick (targetChar) {
  return {
    type: CHAR_CLICK,
    char: targetChar
  }
}

const initialState = {
  chars: [ 'A', 'B', 'C' ].map(ch => ({
    id: getId('char'),
    char: ch
  }))
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHAR_DROP:
      console.warn('drop', action);
      return update(state, {chars: {
        $splice: [
          [action.dragIndex, 1],
          [action.hoverIndex, 0, action.dragChar]
        ]}});
    case CHAR_CLICK:
      return update(state, {$merge: {activeChar: action.char}});
    default:
      return state;
  }
}

