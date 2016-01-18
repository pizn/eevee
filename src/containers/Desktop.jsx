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
    const { auth } = props;
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

  handleAddFile(file) {
    event.preventDefault();
    const { dispatch, user } = this.props;
    const repo = {
      username: user.data.login,
      email: user.data.email,
      reponame: user.data.login + '.github.com',
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
            tree={tree}
          />
          <div className="leaf-desktop-main">
            <div className="leaf-desktop-main-wrap">
              <Head
                logout={this.logout.bind(this)}
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
