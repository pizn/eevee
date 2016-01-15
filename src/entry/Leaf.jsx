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
      <div className="leaf">{this.props.children}</div>
    );
  }
}

export default Leaf;
