import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LarkActions';
import { connect } from 'react-redux';

import Head from '../components/Layout/Head';

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
      <div className="leaf">
        <Head
          {...this.props}
          logout={this.logout.bind(this)}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Lark;
