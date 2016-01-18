import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'antd';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    const { logout, addFile } = this.props;
    return (
      <div className="leaf-desktop-head">
        <Row className="leaf-head-wrap">
          <Col span="20">
            <h2 className="title">文章</h2>
          </Col>
          <Col span="4" className="action">
            {/*
              <Button onClick={logout} >{user.data.login}</Button>
            */}
            <Button onClick={addFile}>添加文章</Button>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Head;
