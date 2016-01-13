import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LarkActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from '../components/Login/Form';

@connect(state => ({
  auth: state.larkAuth,
}))

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    history: PropTypes.object,
  }

  login(auth) {
    const { dispatch, history } = this.props;
    dispatch(actions.login({
      email: auth.email,
      pass: auth.pass,
    }));
    history.pushState(null, '/');
  }

  render() {
    const { dispatch } = this.props;
    const Actions = bindActionCreators(actions, dispatch);
    return (
      <div actions={Actions}>
        <Form onSubmit={this.login.bind(this)} />
      </div>
    );
  }
}

export default Login;
