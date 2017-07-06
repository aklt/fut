import { connect } from 'react-redux';
import FutApp from '../components/FutApp.js';
import {
  charDrop,
  charClick,
  charAdd,
  charRemove,
  pickColor,
  pickChar,
  sliderChange
} from '../redux/modules/futApp'

function mapStateToProps (state, ownProps) {
  return {
    futApp: state.futApp
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    charDrop: (dragIndex, hoverIndex, ch) => {
      return dispatch(charDrop(dragIndex, hoverIndex, ch));
    },
    charClick: (ch) => {
      return dispatch(charClick(ch));
    },
    charAdd: () => {
      return dispatch(charAdd());
    },
    charRemove: () => {
      return dispatch(charRemove());
    },
    pickColor: (color) => {
      return dispatch(pickColor(color));
    },
    pickChar: (char) => {
      return dispatch(pickChar(char));
    },
    sliderChange: (slider, value) => {
      return dispatch(sliderChange(slider, value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FutApp);
