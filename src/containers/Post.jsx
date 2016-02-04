import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';

import yaml from 'js-yaml/lib/js-yaml';

import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';

import Head from '../components/Post/Head';
import Editor from '../components/Post/Editor';
import MetaForm from '../components/Post/Meta';

const confirm = Modal.confirm;

@connect(state => ({
  auth: state.auth,
  user: state.user,
  repoInfo: state.repoInfo,
  blob: state.blob,
}))

class Post extends Component {

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object,
    repoInfo: PropTypes.object,
    blob: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      head: '',
      body: '',
      editMeta: false,
    };
  }

  componentDidMount() {
    const { params, dispatch, user, repoInfo } = this.props;

    document.title = 'Edit post | Eevee';

    const that = this;
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
            path: '_posts/' + params.splat,
          };
          dispatch(actions.readRepoBlob(repo)).then(() => {
            that.generateContent();
          });
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
          dispatch(actions.readRepoBlob(repo)).then(() => {
            that.generateContent();
          });
        });
      } else {
        const repo = {
          username: this.props.user.data.login,
          reponame: this.props.repoInfo.data.name,
          path: '_posts/' + params.splat,
        };
        dispatch(actions.readRepoBlob(repo)).then(() => {
          that.generateContent();
        });
      }
    }
  }

  handleSaveMeta(data) {
    if (data === this.state.head) {
      console.log('[log]: 没有修改');
      return false;
    }
    this.setState({
      meta: yaml.safeLoad(data),
      head: data,
    });
    const cnt = data + '\n---\n' + this.state.body;
    this.handleSave(cnt);
  }

  handleSaveCnt(data) {
    if (data === this.state.body) {
      console.log('[log]: 没有修改');
      return false;
    }

    this.setState({
      body: data,
    });

    const cnt = this.state.head + '\n---\n' + data;
    this.handleSave(cnt);
  }

  handleSave(cnt) {
    const { blob, dispatch, user, repoInfo, params } = this.props;

    if (blob.updating) {
      console.log('[log]: 文档正在保存...');
      return false;
    }

    const repo = {
      username: user.data.login,
      email: user.data.email,
      reponame: repoInfo.data.name,
      path: '_posts/' + params.splat,
      content: cnt,
    };

    const msg = message.loading('Saving...', 0);
    dispatch(actions.updateRepoBlob(repo))
    .then(() => {
      msg();
    });
  }

  handleFocusChange() {
  }

  handleUpdateCode() {
  }

  handleRemove() {
    const { params } = this.props;
    const that = this;
    confirm({
      title: 'Remove this post',
      content: 'The file "' + params.splat + '" will be remove forever.',
      onOk: () => {
        that.handleRemoveReques();
      },
      onCancel: () => {}
    });
  }

  handleRemoveReques() {
    const { dispatch, user, params, repoInfo, history, blob } = this.props;
    let backDir;
    if (blob.loaded) {
      backDir = params.splat.split(blob.data.name)[0];
      backDir = backDir !== '' ? 'd/' + backDir : '';
    }

    const repo = {
      username: user.data.login,
      reponame: repoInfo.data.name,
      path: '_posts/' + params.splat
    };
    const msg = message.loading('Removing...', 0);

    dispatch(actions.removeRepoBlob(repo))
    .then(() => {
      msg();
      // message.success('删除成功');
    })
    .then(() => {
      history.pushState(null, '_posts/' + backDir);
    });
  }

  handleEditMeta() {
    this.setState({
      editMeta: true,
    });
  }

  handleEditMetaSubmit(data) {
    this.setState({
      editMeta: false,
    });
    let tmpData = '---\n' +
      'layout: ' + data.layout + '\n' +
      'title: ' + data.title + '\n' +
      'description: ' + data.description + '\n';
    if (data.categories) {
      tmpData += 'categories: ' + data.categories + '\n';
    }
    if (data.tags) {
      tmpData += 'tags: ' + data.tags + '\n';
    }
    this.handleSaveMeta(tmpData);
  }

  handleEditMetaCancel() {
    this.setState({
      editMeta: false,
    });
  }

  splitInput(str) {
    if (str.slice(0, 3) !== '---') {
      return;
    }
    const matcher = /\n(\.{3}|-{3})\n/g;
    const metaEnd = matcher.exec(str);
    return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
  }

  metaMarked(src) {
    const mySplitInput = this.splitInput(src);
    return mySplitInput ? {
      meta: yaml.safeLoad(mySplitInput[0]),
      head: mySplitInput[0],
      body: mySplitInput[1]
    } : {
      meta: null,
      head: null,
      body: src
    };
  }

  generateContent() {
    const { blob } = this.props;
    if (blob.loaded) {
      const defaultValue = this.metaMarked(blob.data.content);
      // update meta and head
      this.setState({
        meta: defaultValue.meta,
        head: defaultValue.head,
        body: defaultValue.body,
      });
    } else {
      if (blob.error) {
        const msg = blob.error.request && blob.error.request.message;
        message.error(msg || 'Something error');
      }
    }
  }

  render() {
    const { blob } = this.props;
    return (
      <div className="leaf">
        <div className="leaf-post">
          <Head
            {...this.props}
            blob={blob}
            meta={this.state.meta}
            handleRemove={this.handleRemove.bind(this)}
            handleEditMeta={this.handleEditMeta.bind(this)}
          />
          <Editor
            {...this.props}
            blob={blob}
            value={this.state.body}
            onChange={this.handleUpdateCode.bind(this)}
            onFocusChange={this.handleFocusChange.bind(this)}
            handleSave={this.handleSaveCnt.bind(this)}
          />
          <MetaForm
            metaData={this.state.meta}
            modalVisible={this.state.editMeta}
            modalHandleOk={this.handleEditMetaSubmit.bind(this)}
            modalHandleCancel={this.handleEditMetaCancel.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Post;
