import React, { Component, PropTypes } from 'react';

class Leaf extends Component {

  static propTypes = {
    children: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default Leaf;
