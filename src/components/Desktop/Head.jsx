import React, { Component, PropTypes } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    const { addFile, repoInfo } = this.props;
    return (
      <div className="leaf-desktop-head">
          { repoInfo.loaded &&
            <Row className="leaf-head-wrap">
              <Col span="20">
                <h2 className="title">{repoInfo.data.name} <Icon type="right" /> _posts</h2>
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
