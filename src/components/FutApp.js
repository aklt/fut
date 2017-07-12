import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import entities from 'entities';

import CharPicker from './CharPicker';
import ColorPicker from './ColorPicker';
import Canvas from './Canvas';
import LayerStack from './LayerStack';

import Slider from './Slider';

import './FutApp.css';

class FutApp extends Component {

  static propTypes = {
    charDrop: PropTypes.func.isRequired,
    charClick: PropTypes.func.isRequired,
    pickColor: PropTypes.func.isRequired,
    sliderChange: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  charClick = (ch) => {
    this.props.charClick(ch);
  }

  charDrop = (dragIndex, dropIndex, ch) => {
    this.props.charDrop(dragIndex, dropIndex, ch);
  }

  sliderChange = (slider) => {
    return (value) => {
      this.props.sliderChange(slider, value);
    }
  }

  render() {
    console.warn('FutApp props', this.props);
    const {
      chars,
      activeIndex
    } = this.props.futApp;
    let ch = chars[activeIndex] || {}
    return (
      <section className="container">
        <div className="head">
          <h1>Fut Maker</h1>
        </div>
        <div className="body">
          <CharPicker
            onSelectChar={this.props.pickChar} />
          <div className="mid">
            <ColorPicker
              onPickColor={this.props.pickColor} />
            <Slider name="X" min={0} max={35}
              value={ch.x}
              onChange={this.sliderChange('x')} />
            <Slider name="Y" min={0} max={35}
              value={ch.y}
              onChange={this.sliderChange('y')} />
            <Slider name="Size" min={0} max={35}
              value={ch.sz}
              onChange={this.sliderChange('sz')} />
            <Slider name="Scale X" min={0} max={35}
              value={ch.sx}
              onChange={this.sliderChange('sx')} />
            <Slider name="Scale Y" min={0} max={35}
              value={ch.sy}
              onChange={this.sliderChange('sy')} />
            <Slider name="Rotate" min={0} max={35}
              value={ch.r}
              onChange={this.sliderChange('r')} />
          </div>
          <div className="mid">
            <Canvas chars={chars}
                    width={200}
                    height={200}
                  />
          </div>
          <LayerStack 
            chars={this.props.futApp.chars}
            activeIndex={this.props.futApp.activeIndex}
            charClick={this.charClick}
            charDrop={this.charDrop}
            charAdd={this.props.charAdd}
            charRemove={this.props.charRemove}
          />
        </div>
        <div className="foot">
        </div>
      </section>
    )
  }
}

export default FutApp;
