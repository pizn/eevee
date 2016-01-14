import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LeafActions';
import { connect } from 'react-redux';
import Github from 'github-api';

import { Icon } from 'antd';

import Head from '../components/Desktop/Head';

@connect(state => ({
  auth: state.auth,
  user: state.user,
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
    const { dispatch } = this.props;
    dispatch(actions.updateUserInfo());

    

    const ops = {
      type: 'owner',
      sort: 'updated',
      per_page: 100,
      page: 1
    };

    this.user.repos(ops, (err, repos) => {
      repos.map(item => {
        console.log(item.name);
      })
    });
  }

  logout() {
    const { dispatch, history } = this.props;

    dispatch(actions.logout())
    .then(() => {
      history.pushState(null, '/login');
    });
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="leaf">
        <Head
          {...this.props}
          user={user}
          logout={this.logout.bind(this)}
        />
        <div>
          { user.loading &&
            <Icon type="loading" />
          }
          { !user.loading &&
            <div>
              <img src={user.data.avatar_url} />
              <span>{user.data.login}</span>
              <span>{user.data.email}</span>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Desktop;
