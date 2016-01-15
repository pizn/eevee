import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';
import Github from 'github-api';

import { Icon } from 'antd';

import Head from '../components/Desktop/Head';
import Aside from '../components/Desktop/Aside';

@connect(state => ({
  auth: state.auth,
  user: state.user,
  repoInfo: state.repoInfo,
}))

class Desktop extends Component {

  constructor(props) {
    super(props);
    const { auth } = props;
    this.github = new Github({
      username: auth.email,
      password: auth.pass,
      auth: 'basic',
    });
    this.user = this.github.getUser();
  }

  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.object,
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    if (!user.loaded) {
      dispatch(actions.updateUserInfo())
      .then(() => {
        const repo = {
          username: this.props.user.data.login,
          reponame: this.props.user.data.login + '.github.com',
        }
        dispatch(actions.loadRepoInfo(repo));
        dispatch(actions.loadRepoTree(repo));
      })
    }
  }

  logout() {
    const { dispatch, history } = this.props;

    dispatch(actions.logout())
    .then(() => {
      history.pushState(null, '/login');
    });
  }

  render() {
    const { user, repoInfo } = this.props;
    console.log(repoInfo);
    return (
      <div className="leaf">
        <div lassName="leaf-desktop">
          <Aside
            user={user}
          />
          <div className="leaf-desktop-main">
            <div className="leaf-desktop-main-wrap">
              <Head
                logout={this.logout.bind(this)}
                user={user}
                repoInfo={repoInfo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop;
