import React, { Component, PropTypes } from 'react';

class Leaf extends Component {

  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default Leaf;
