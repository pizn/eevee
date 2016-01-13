import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    const { logout } = this.props;
    return (
      <div className="lark-head">
        <Row className="lark-head-wrap">
          <Col span="8">
            <div className="logo">云雀</div>
          </Col>
          <Col span="16">
            <a onClick={logout}>登出</a>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Head;
