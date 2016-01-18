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
    const { auth } = this.props;
    return (
      <div className="leaf">
        <div className="leaf-login">
          <div className="leaf-login-contain">
            <div className="leaf-login-contain-head">
              <div className="head-logo"></div>
            </div>
            <div className="leaf-login-contain-form">
              <Form
                onSubmit={this.handleSubmit.bind(this)}
                auth={auth}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
