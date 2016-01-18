import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, Icon } from 'antd';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    const { tree, addFile } = this.props;
    return (
      <div className="leaf-desktop-head">
          { tree.loaded &&
            <Row className="leaf-head-wrap">
              <Col span="20">
                <h2 className="title">文章</h2>
              </Col>
              <Col span="4" className="action">
                <Button type="ghost" onClick={addFile}><Icon type="plus" /> 添加</Button>
              </Col>
            </Row>
          }
      </div>
    );
  }

}

export default Head;
