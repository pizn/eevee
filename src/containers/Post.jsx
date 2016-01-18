import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';

import { Icon } from 'antd';
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
        dispatch(actions.readRepoBlob(repo));
      })
    } else {
      const repo = {
        username: this.props.user.data.login,
        reponame: this.props.user.data.login + '.github.com',
        path: '_posts/' + params.name,
      }
      dispatch(actions.readRepoBlob(repo));
    }

  }

  handleSave(value) {
    console.log(value);
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
