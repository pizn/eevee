import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from '../components/Login/Form';

@connect(state => ({
  auth: state.auth,
  user: state.user,
}))

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
  }

  handleSubmit(data) {
    const { dispatch, history } = this.props;
    dispatch(actions.login({
      email: data.email,
      pass: data.pass,
    })).then(() => {
      const { auth } = this.props;
      if (auth.loggedIn) {
        dispatch(actions.updateUserInfo(auth.user));
      } else {
        return false;
      }
    }).then(() => {
      history.pushState(null, '/')
    });
  }

  render() {
    const { dispatch, auth } = this.props;
    const Actions = bindActionCreators(actions, dispatch);
    return (
      <div actions={Actions}>
        <Form onSubmit={this.handleSubmit.bind(this)} auth={auth}/>
      </div>
    );
  }
}

export default Login;
