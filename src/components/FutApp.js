import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import entities from 'entities';

import Input from './Input';
import TextArea from './TextArea';

import LayerStack from './LayerStack';
import CharPicker from './CharPicker';
import ColorPicker from './ColorPicker';
import CharPalette from './CharPalette';

import './FutApp.css';

class FutApp extends Component {

  static propTypes = {
    onChangeUrl: PropTypes.func.isRequired,
    onChangeSelector: PropTypes.func.isRequired,
    onChangeFilter: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props);
  }

  render() {
    let urlButtonOpts = {
      disabled: this.disableSubmit
    }
    return (
      <section className="container">
        <div className="head">
          <h1>Fut Maker</h1>
          <blockquote>
            Fut for speed
          </blockquote>
        </div>
        <div className="body">
          <CharPicker />
          <ColorPicker />
          <CharPalette />
        </div>
      <div className="foot">
        </div>
      </section>
    )
  }
}

export default FutApp;
