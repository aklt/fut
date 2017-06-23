import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import getId from '../getId';

import './Input.css';

export default class Input extends Component {

  static propTypes = {
    label: PropTypes.string,
    spellcheck: PropTypes.bool,
    pattern: PropTypes.string,
    type:  PropTypes.oneOf([
      'text',
      'search'
    ]),
    validate: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  static defaultProps = {
    label: '',
    spellcheck: false,
    type: 'text',
    value: '',
  }

  constructor (props) {
    super(props);
    this.id = getId();
    this.isValidated = true;
  }

  onChange = (event) => {
    let url = event.target.value;
    this.isValidated = this.props.validate(url);
    this.props.onChange(url, this.isValidated);
  }

  focus() {
    this.el.focus()
  }
  
  render() {
    let opts = {
      className: cn({
        invalid: !this.isValidated
      })
    }

    return (
      <label htmlFor={this.id}>
        <span>{this.props.label}</span>
        <input onChange={this.onChange}
               ref={(el) => {this.el = el}}
               id={this.id}
               type={this.props.type}
               spellCheck={this.props.spellcheck}
               {...opts}
             />
      </label>
    );
  }
}
