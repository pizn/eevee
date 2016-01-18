import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';

import { Icon, message, Modal } from 'antd';
import Head from '../components/Post/Head';
import Editor from '../components/Post/Editor';

const confirm = Modal.confirm;

@connect(state => ({
  auth: state.auth,
  user: state.user,
  repoInfo: state.repoInfo,
  blob: state.blob,
}))

class Post extends Component {

  componentDidMount() {
    const { params, dispatch, user, repoInfo } = this.props;

    if (!user.loaded) {
      dispatch(actions.updateUserInfo())
      .then(() => {
        dispatch(actions.loadRepoInfo({username: this.props.user.data.login}))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts/' + params.name,
          }
          dispatch(actions.readRepoBlob(repo))
        });
      })
    } else {
      if (!repoInfo.loaded) {
        dispatch(actions.loadRepoInfo({username: this.props.user.data.login}))
        .then(() => {
          const repo = {
            username: this.props.user.data.login,
            reponame: this.props.repoInfo.data.name,
            path: '_posts/' + params.name,
          }
          dispatch(actions.readRepoBlob(repo));
        });
      } else {
        const repo = {
          username: this.props.user.data.login,
          reponame: this.props.repoInfo.data.name,
          path: '_posts/' + params.name,
        }
        dispatch(actions.readRepoBlob(repo));
      }
    }
  }

  handleSave(value) {
    const { blob, dispatch, user, repoInfo, params } = this.props;
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
      reponame: repoInfo.data.name,
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

  handleRemove() {
    const { params } = this.props;
    const that = this;
    confirm({
      title: '删除文章',
      content: '注意: 文件 "' + params.name + '" 将被永久删除',
      onOk: function() {
        that.handleRemoveReques();
      },
      onCancel: function() {}
    });
  }

  handleRemoveReques() {
    const { dispatch, user, params, repoInfo, history } = this.props;
    const repo = {
      username: user.data.login,
      reponame: repoInfo.data.name,
      path: '_posts/' + params.name
    }
    dispatch(actions.removeRepoBlob(repo))
    .then(() => {
      message.success('删除成功');
    })
    .then(() => {
      history.pushState(null, '_posts/');
    });
  }

  render() {
    const { blob } = this.props;
    return (
      <div className="leaf">
        <div className="leaf-post">
          <Head
            {...this.props}
            blob={blob}
            handleRemove={this.handleRemove.bind(this)}
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
