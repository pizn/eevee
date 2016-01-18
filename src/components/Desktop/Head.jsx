import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'antd';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    const { logout, user, repoInfo } = this.props;
    return (
      <div className="leaf-desktop-head">
        <Row className="leaf-head-wrap">
          <Col span="16">
            <h2 className="title">文章</h2>
          </Col>
          <Col span="8">
            <Button onClick={logout} >{user.data.login}</Button>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Head;
