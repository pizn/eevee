import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import userAPI from '../services/user';
import LoginForm from '../components/Login/LoginForm';

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

  constructor(props) {
    super(props);

    this.state = {
      noRepo: false,
    };
  }

  handleSubmit(data) {
    const { dispatch, history } = this.props;
    const that = this;
    dispatch(actions.login({
      email: data.email,
      pass: data.pass,
    })).then(() => {
      const { auth } = this.props;
      if (auth.loggedIn) {
        dispatch(actions.updateUserInfo(auth.user));
        const { user } = this.props;
        if (user.loaded) {
          dispatch(actions.loadRepoInfo({username: user.data.login}))
          .then(() => {
            if (this.props.repoInfo.loaded) {
              dispatch(actions.loginDone());
              history.pushState(null, '/');
            } else {
              that.setState({
                noRepo: true,
              });
            }
          });
        }
      }
    });
  }

  logout() {
    const { dispatch } = this.props;
    const that = this;
    dispatch(actions.logout())
    .then(() => {
      that.setState({
        noRepo: false,
      });
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
          { !this.state.noRepo &&
            <div className="leaf-login-contain">
              <div className="leaf-login-contain-head">
                <div className={logoCls}></div>
              </div>
              <div className="leaf-login-contain-form">
                <LoginForm
                  onSubmit={this.handleSubmit.bind(this)}
                  auth={auth}
                />
              </div>
            </div>
          }
          { this.state.noRepo &&
            <div className="leaf-login-contain">
              <div className="leaf-login-contain-head">
                <div className="head-user">
                  <img src={user.data.avatar_url} className="avatar" />
                  <h4 className="name">{user.data.name || user.data.login}</h4>
                </div>
              </div>
              <div className="leaf-login-contain-contain">
                <p>Hi, 你还没创建 <code>{user.data.login}.github.io</code> 的项目, 请移步 <a href="https://pages.github.com/" target="_blank">GitHub Pages</a> 创建.</p>
              </div>
              <div className="leaf-login-contain-foot">
                <Button type="ghost" size="large" style={{'width': '100%'}} onClick={this.logout.bind(this)}>登 出 <Icon type="github" /></Button>
              </div>
            </div>
          }
          <div className="leaf-login-foot">
            <p>Write with <span className="love">Love</span> in <a href="https://github.com/pizn/eevee" target="_blank">Eevee</a>.</p>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;
