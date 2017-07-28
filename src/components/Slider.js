import PropTypes from 'prop-types';
import React, {Component} from 'react';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

import getId from '../getId';

import './Slider.css';

class Slider extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  static defaultProps = {
    onChange: () => {
      console.warn('Change');
    },
  };

  changeNumber = (...value) => {
    console.warn('Change number', value);
  };

  render() {
    const props = Object.assign({}, this.props);
    const name = props.name;
    delete props.name;
    const id = getId('slider');
    return (
      <div className="slider" htmlFor={id}>
        <span className="slider__name">
          {name}
        </span>
        <RcSlider id={id} className="slider__rcslider" {...props} />
        <span className="slider__value">
          {props.value}
        </span>
      </div>
    );
  }
}

export default Slider;
