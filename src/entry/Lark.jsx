import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LarkActions';
import { connect } from 'react-redux';

@connect(state => ({
  auth: state.larkAuth,
}))

class Lark extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.object,
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(actions.logout());
  }

  render() {
    return (
      <div className="lark">
        <a onClick={this.logout.bind(this)} >登出</a>
        {this.props.children}
      </div>
    );
  }
}

export default Lark;
