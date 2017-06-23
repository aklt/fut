import { connect } from 'react-redux';
import FutApp from '../components/FutApp.js';
import {
  charDrop,
  charClick,
  pickColor,
  pickChar
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
    pickColor: (color) => {
      return dispatch(pickColor(color));
    },
    pickChar: (char) => {
      return dispatch(pickChar(char));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FutApp);
