import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LarkActions';
import { connect } from 'react-redux';

import Head from '../components/Layout/Head';

@connect(state => ({
  auth: state.larkAuth,
}))

class Desktop extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.object,
  }

  componentDidMount() {

  }

  logout() {
    const { dispatch, history } = this.props;
    dispatch(actions.logout());
    history.pushState(null, '/login');
  }

  render() {
    return (
      <div className="leaf">
        <Head
          {...this.props}
          logout={this.logout.bind(this)}
        />
        <div>1231313</div>
      </div>
    );
  }
}

export default Desktop;
