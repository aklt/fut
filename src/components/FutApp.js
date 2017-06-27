import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import entities from 'entities';

import CharPicker from './CharPicker';
import ColorPicker from './ColorPicker';
import LayerStack from './LayerStack';

import Slider from './Slider';

import './FutApp.css';

class FutApp extends Component {

  static propTypes = {
    charDrop: PropTypes.func.isRequired,
    charClick: PropTypes.func.isRequired,
    pickColor: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  charClick = (ch) => {
    this.props.charClick(ch);
  }

  charDrop = (dragIndex, dropIndex, ch) => {
    this.props.charDrop(dragIndex, dropIndex, ch);
  }

  render() {
    console.warn('FutApp props', this.props);
    return (
      <section className="container">
        <div className="head">
          <h1>Fut Maker</h1>
          <blockquote>
            Fut for speed
          </blockquote>
        </div>
        <div className="body">
          <CharPicker
            onSelectChar={this.props.pickChar} />
          <div className="mid">
            <ColorPicker
              onPickColor={this.props.pickColor} />
            <Slider name="X" min={0} max={32} />
            <Slider name="Y" min={0} max={32} />
            <Slider name="Width" min={0} max={32} />
            <Slider name="Height" min={0} max={32} />
            <Slider name="Scale X" min={0} max={32} />
            <Slider name="Scale Y" min={0} max={32} />
            <Slider name="Rotate" min={0} max={32} />
          </div>
          <LayerStack 
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
