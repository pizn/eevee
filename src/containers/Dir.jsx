import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';

import message from 'antd/lib/message';

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

class Dir extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object,
    repoInfo: PropTypes.object,
    tree: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      addFile: false,
    };
  }

  componentDidMount() {
    document.title = 'Directory | Eevee';
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.splat;
    const newId = this.props.params.splat;
    if (newId !== oldId) {
      this.getData();
    }
  }

  getData() {
    const { dispatch, user, repoInfo, params } = this.props;
    const { splat } = params;
    if (!user.loaded) {
      dispatch(actions.updateUserInfo())
      .then(() => {
        dispatch(actions.loadRepoInfo({
          username: this.props.user.data.login,
        }))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts/' + splat,
          };
          dispatch(actions.readRepoTree(repo));
        });
      });
    } else {
      if (!repoInfo.loaded) {
        dispatch(actions.loadRepoInfo({
          username: this.props.user.data.login,
        }))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts/' + params.splat,
          };
          dispatch(actions.readRepoTree(repo));
        });
      } else {
        const repo = {
          username: this.props.user.data.login,
          reponame: this.props.repoInfo.data.name,
          path: '_posts/' + params.splat,
        };
        dispatch(actions.readRepoTree(repo));
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
    const { dispatch, user, history, repoInfo, params } = this.props;

    const content = '---\n' +
      'layout: post\n' +
      'title: ' + file.title + '\n' +
      'description: ' + file.description + '\n' +
      '---\n' +
      '# ';

    const repo = {
      username: user.data.login,
      email: user.data.email,
      reponame: repoInfo.data.name,
      path: '_posts/' + params.splat + '/' + file.name,
      content,
    };
    this.setState({
      addFile: false
    });
    const msg = message.loading('Saving...', 0);
    dispatch(actions.addRepoBlob(repo))
    .then(() => {
      msg();
      history.pushState(null, '_posts/f/' + params.splat + '/' + file.name);
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
    });
  }

  render() {
    const { user, repoInfo, tree } = this.props;

    return (
      <div className="leaf">
        <div className="leaf-desktop">
          <Aside
            {...this.props}
            user={user}
            repoInfo={repoInfo}
            logout={this.logout.bind(this)}
            tree={tree}
          />
          <div className="leaf-desktop-main">
            <div className="leaf-desktop-main-wrap">
              <Head
                {...this.props}
                repoInfo={repoInfo}
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

export default Dir;
