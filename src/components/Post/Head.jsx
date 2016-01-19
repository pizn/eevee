import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
  }

  remove(e) {
    e.preventDefault();
    const { handleRemove } = this.props;
    handleRemove();
  }

  handleEditMeta(e) {
    e.preventDefault();
    const { handleEditMeta } = this.props;
    handleEditMeta();
  }

  render() {
    const { blob, meta } = this.props;

    return (
      <div className="leaf-post-head">
        <Row>
          <Col span="7" >
            <Link to={`_posts/`} className="back">
              <Icon type="left" />
            </Link>
          </Col>
          <Col span="10" className="loading">
            { blob.loaded &&
              <div className="meta">
                <div className="meta-title">
                  {meta && meta.title} <Icon type="caret-down" />
                </div>
                <div className="meta-card">
                  { meta.description &&
                    <Row className="meta-card-item">
                      <Col span="4" className="name">描述:</Col>
                      <Col span="20" className="cnt">{meta.description}</Col>
                    </Row>
                  }
                  { meta.categories &&
                    <Row className="meta-card-item">
                      <Col span="4" className="name">分类:</Col>
                      <Col span="20" className="cnt">{meta.categories}</Col>
                    </Row>
                  }
                  { meta.tags &&
                    <Row className="meta-card-item">
                      <Col span="4" className="name">标签:</Col>
                      <Col span="20" className="cnt">{meta.tags}</Col>
                    </Row>
                  }
                  <a onClick={this.handleEditMeta.bind(this)} className="meta-card-edit">
                    编辑
                  </a>
                </div>
              </div>
            }
            { !blob.loaded &&
              <h1 className="title">
                <Icon type="loading" />
              </h1>
            }
          </Col>
          <Col span="7" className="action">
            <div className="action-list">
              <div className="action-list-toggle">
                <Icon type="ellipsis" />
              </div>
              <ul className="action-list-dropdown">
                <li className="item"><a href={blob.data.html_url} target="_blank"><Icon type="code" /> 源文件</a></li>
                <li className="item"><a onClick={this.remove.bind(this)}><Icon type="delete" /> 删除</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Head;
