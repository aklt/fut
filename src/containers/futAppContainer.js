import { connect } from 'react-redux';
import FutApp from '../components/FutApp.js';
import {
  charDrop,
  charClick
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
    }

//    onChangeUrl: (value) => { return dispatch(onChangeUrl(value)); },
//    onChangeSelector: (value) => { 
//      console.warn('XXX', value);
//      return dispatch(onChangeSelector(value)); },
//    onChangeFilter: (value) => { return dispatch(onChangeFilter(value)); },
//    asyncFilter: (string) => { return dispatch(asyncFilter(string)); }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FutApp);
