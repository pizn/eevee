import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Form from '../components/Login/Form';
import userAPI from '../services/user';

@connect(state => ({
  auth: state.auth,
  user: state.user,
  repoInfo: state.repoInfo,
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
      const { user } = this.props;
      if (user.loaded) {
        userAPI.checkRepo(user.data.login)
        .then((data) => {
          dispatch(actions.updateRepoInfo(data));
          history.pushState(null, '/')
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        return false;
      }
    });
  }

  render() {
    const { auth, user, repoInfo } = this.props;
    const logoCls = classNames({
      'head-logo': true,
      'head-logo-loading': auth.loading || user.loading || repoInfo.loading,
    });

    return (
      <div className="leaf">
        <div className="leaf-login">
          <div className="leaf-login-contain">
            <div className="leaf-login-contain-head">
              <div className={logoCls}></div>
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
