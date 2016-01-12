import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/LarkActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({
  auth: state.larkAuth,
}))

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.login({
      email: 'pizner@gmail.com',
      pass: 'hello',
    }));
  }

  render() {
    const { dispatch } = this.props;
    const Actions = bindActionCreators(actions, dispatch);
    return (
      <div actions={Actions}>login</div>
    );
  }
}

export default Login;
