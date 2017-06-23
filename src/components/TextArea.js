
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends Component {

  onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  focus() {
    this.el.focus()
  }

  static propTypes = {
    cols: PropTypes.number,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    value: PropTypes.string
  }

  static defaultProps = {
    cols: 40,
    disabled: true,
    rows: 20,
    value: ''
  }

  render() {
    let opts = {}
    if (this.props.disabled) {
      opts.disabled = 'disabled';
    }
    return (
      <textarea
        ref={(el) => { this.el = el; }}
        cols={this.props.cols}
        value={this.props.value}
        onChange={this.onChange}
        {...opts}
      >
      </textarea>
    );
  }
}
