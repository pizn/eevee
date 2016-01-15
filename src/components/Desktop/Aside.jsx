import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon } from 'antd';

class Aside extends Component {
  render() {
    const { user } = this.props;
    const yearNow = new Date().getFullYear();
    return (
      <div className="leaf-desktop-aside">
        <div className="head">
          <div className="head-logo"></div>
          <h1 className="head-title">Leafeon • Writing</h1>
        </div>

        <div className="body">
        </div>

        <div className="foot">
          { !user.loading &&
          <Row className="foot-user">
            <Col span="5">
              <img className="foot-user-avatar" src={user.data.avatar_url} />
            </Col>
            <Col span="19" className="foot-user-info">
              <p className="name">{user.data.name || user.data.login}</p>
              <p className="email">{user.data.email}</p>
            </Col>
          </Row>
          }
          {/*
          <Row className="foot-copyright">
            <p className="text">Code & Design by <a href="http://pizn.net">PIZn</a></p>
          </Row>
          */}
        </div>
      </div>
    )
  }
}

export default Aside;
