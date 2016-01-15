import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';

import { Icon } from 'antd';

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

  render() {
    const { blob } = this.props;
    return (
      <div>
        { blob.loading &&
          <Icon type="loading" />
        }
        { !blob.loading &&
          <div>
            {blob.data.content}
          </div>
        }
      </div>
    );
  }
}

export default Post;
