import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';
import Github from 'github-api';

import { Icon, message } from 'antd';

import Head from '../components/Desktop/Head';
import Aside from '../components/Desktop/Aside';
import List from '../components/Desktop/List';
import ModalAddFile from '../components/Desktop/AddFile';

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
    this.state = {
      addFile: false
    }
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
        dispatch(actions.loadRepoInfo({username: this.props.user.data.login}))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts',
          };
          dispatch(actions.readRepoTree(repo));
        });
      });
    } else {
      if (!repoInfo.loaded) {
        dispatch(actions.loadRepoInfo({username: this.props.user.data.login}))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts',
          }
          dispatch(actions.readRepoTree(repo));
        });
      } else {
        if (!tree.loaded) {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts',
          }
          dispatch(actions.readRepoTree(repo));
        }
      }
    }
    dispatch(actions.clearRepoBlob());
  }
  logout() {
    const { dispatch, history } = this.props;
    dispatch(actions.logout())
    .then(() => {
      history.pushState(null, 'login');
    });
  }

  handleAddFile(file) {
    event.preventDefault();
    const { dispatch, user, history, repoInfo } = this.props;
    const repo = {
      username: user.data.login,
      email: user.data.email,
      reponame: repoInfo.data.name,
      path: '_posts/' + file.name,
      content: '',
    }
    this.setState({
      addFile: false
    });
    const msg = message.loading('正在保存...', 0);
    dispatch(actions.addRepoBlob(repo))
    .then(() => {
      msg();
      history.pushState(null, '_posts/' + file.name)
    });

  }

  handleShowAddModal() {
    this.setState({
      addFile: true
    });
  }

  handleHideAddModal() {
    this.setState({
      addFile: false,
    })
  }

  render() {
    const { user, repoInfo, tree } = this.props;

    return (
      <div className="leaf">
        <div className="leaf-desktop">
          <Aside
            user={user}
            repoInfo={repoInfo}
            logout={this.logout.bind(this)}
            tree={tree}
          />
          <div className="leaf-desktop-main">
            <div className="leaf-desktop-main-wrap">
              <Head
                tree={tree}
                addFile={this.handleShowAddModal.bind(this)}
              />
              <List
                tree={tree}
              />
              <ModalAddFile
                modalVisible={this.state.addFile}
                modalHandleOk={this.handleAddFile.bind(this)}
                modalHandleCancel={this.handleHideAddModal.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop;
