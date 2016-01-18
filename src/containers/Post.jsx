import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';

import { Icon, message } from 'antd';
import Head from '../components/Post/Head';
import Editor from '../components/Post/Editor';

@connect(state => ({
  auth: state.auth,
  user: state.user,
  repoInfo: state.repoInfo,
  repoTree: state.repoTree,
  tree: state.tree,
  blob: state.blob,
}))

class Post extends Component {

  componentDidMount() {
    const { params, dispatch, user } = this.props;

    if (!user.loaded) {
      dispatch(actions.updateUserInfo())
      .then(() => {
        const repo = {
          username: this.props.user.data.login,
          reponame: this.props.user.data.login + '.github.com',
          path: '_posts/' + params.name,
        }
        dispatch(actions.readRepoBlob(repo))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.user.data.login + '.github.com',
            sha: this.props.blob.data.sha,
          }
          // dispatch(actions.readRepoBlobCommit(repo))
        });
      })
    } else {
      const repo = {
        username: this.props.user.data.login,
        reponame: this.props.user.data.login + '.github.com',
        path: '_posts/' + params.name,
      }
      dispatch(actions.readRepoBlob(repo))
      .then(() => {
        const repo = {
          username: user.data.login,
          reponame: user.data.login + '.github.com',
          sha: this.props.blob.data.sha,
        }
        // dispatch(actions.readRepoBlobCommit(repo))
      });
    }
  }

  handleSave(value) {
    const { blob, dispatch, user, params } = this.props;
    if (blob.data.content === value) {
      console.info('[leafeon]: 文档没有修改');
      return false;
    }
    if (blob.updating) {
      console.log('[leafeon]: 文档正在保存...');
      return false;
    }
    const repo = {
      username: user.data.login,
      email: user.data.email,
      reponame: user.data.login + '.github.com',
      path: '_posts/' + params.name,
      content: value,
    }
    const msg = message.loading('正在保存...', 0);
    dispatch(actions.updateRepoBlob(repo))
    .then(() => {
      msg();
      if (this.props.blob.updated) {
        message.success('已更新');
      } else {
        message.error('未更新');
      }
    });
  }

  handleFocusChange(focused) {
  }

  handleUpdateCode(value) {
  }

  render() {
    const { blob } = this.props;
    return (
      <div className="leaf">
        <div className="leaf-post">
          <Head
            {...this.props}
            blob={blob}
          />
          <Editor
            {...this.props}
            blob={blob}
            value={blob.data.content}
            onChange={this.handleUpdateCode.bind(this)}
            onFocusChange={this.handleFocusChange.bind(this)}
            handleSave={this.handleSave.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Post;
