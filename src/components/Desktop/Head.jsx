import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'antd';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    const { logout, auth, user } = this.props;
    return (
      <div className="leaf-head">
        <Row className="leaf-head-wrap">
          <Col span="8">
            <div className="logo">叶精灵</div>
          </Col>
          <Col span="16">
            <Button onClick={logout} >{user.data.login}</Button>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Head;
