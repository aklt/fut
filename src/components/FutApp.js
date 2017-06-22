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
    charDrop: PropTypes.func.isRequired,
    charClick: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props);
  }

  charClick = (ch) => {
    this.props.charClick(ch);
  }

  charDrop = (dragIndex, dropIndex, ch) => {
    this.props.charDrop(dragIndex, dropIndex, ch);
  }

  render() {
    console.warn('FutApp props', this.props);
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
          <CharPalette 
            chars={this.props.futApp.chars}
            charClick={this.charClick}
            charDrop={this.charDrop}
          />
        </div>
        <div className="foot">
        </div>
      </section>
    )
  }
}

export default FutApp;
