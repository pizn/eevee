import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';
import Github from 'github-api';

import { Icon } from 'antd';

import Head from '../components/Desktop/Head';
import Aside from '../components/Desktop/Aside';
import List from '../components/Desktop/List';

@connect(state => ({
  auth: state.auth,
  user: state.user,
  repoInfo: state.repoInfo,
  repoTree: state.repoTree,
  tree: state.tree,
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
    const { dispatch, user, repoInfo, tree } = this.props;
    if (!user.loaded) {
      dispatch(actions.updateUserInfo())
      .then(() => {
        const repo = {
          username: this.props.user.data.login,
          reponame: this.props.user.data.login + '.github.com',
          path: '_posts',
        }
        dispatch(actions.loadRepoInfo(repo));
        dispatch(actions.readRepoTree(repo));
      });
    } else if (!repoInfo.loaded) {
      const repo = {
        username: this.props.user.data.login,
        reponame: this.props.user.data.login + '.github.com',
        path: '_posts',
      }
      dispatch(actions.loadRepoInfo(repo));
      dispatch(actions.readRepoTree(repo));
    }
    dispatch(actions.clearRepoBlob());
  }
  logout() {
    const { dispatch, history } = this.props;
    dispatch(actions.logout())
    .then(() => {
      history.pushState(null, '/login');
    });
  }

  render() {
    const { user, repoInfo, tree } = this.props;

    return (
      <div className="leaf">
        <div className="leaf-desktop">
          <Aside
            user={user}
            repoInfo={repoInfo}
          />
          <div className="leaf-desktop-main">
            <div className="leaf-desktop-main-wrap">
              <Head
                logout={this.logout.bind(this)}
                user={user}
                repoInfo={repoInfo}
              />
              <List
                tree={tree}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop;
