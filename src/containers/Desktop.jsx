import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LarkActions';
import { connect } from 'react-redux';
import Github from 'github-api';

import Head from '../components/Desktop/Head';

@connect(state => ({
  auth: state.larkAuth,
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

    this.user.show(null, (err, user) => {
      console.log(user);
    });

  }

  logout() {
    const { dispatch, history } = this.props;
    dispatch(actions.logout());
    history.pushState(null, '/login');
  }

  render() {
    return (
      <div className="leaf">
        <Head
          {...this.props}
          logout={this.logout.bind(this)}
        />
        <div>1231313</div>
      </div>
    );
  }
}

export default Desktop;
