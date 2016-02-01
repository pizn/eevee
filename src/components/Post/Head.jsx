import React, { Component, PropTypes } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import { Link } from 'react-router';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
    handleRemove: PropTypes.func,
    handleEditMeta: PropTypes.func,
    blob: PropTypes.object,
    meta: PropTypes.object,
    params: PropTypes.object,
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
    const { blob, meta, params } = this.props;
    // define backUrl
    let backDir = '';
    if (blob.loaded) {
      backDir = params.splat.split(blob.data.name)[0];
      backDir = backDir !== '' ? 'd/' + backDir : '';
    }

    return (
      <div className="leaf-post-head">
        <Row>
          <Col span="7" >
            <Link to={`/_posts/${backDir}`} className="back">
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
                      <Col span="6" className="name">Description:</Col>
                      <Col span="18" className="cnt">{meta.description}</Col>
                    </Row>
                  }
                  { meta.categories &&
                    <Row className="meta-card-item">
                      <Col span="6" className="name">Categories:</Col>
                      <Col span="18" className="cnt">{meta.categories}</Col>
                    </Row>
                  }
                  { meta.tags &&
                    <Row className="meta-card-item">
                      <Col span="6" className="name">Tags:</Col>
                      <Col span="18" className="cnt">{meta.tags}</Col>
                    </Row>
                  }
                  <a onClick={this.handleEditMeta.bind(this)} className="meta-card-edit">
                    Edit
                  </a>
                </div>
              </div>
            }
            { !blob.loaded &&
              <h1 className="title">
                { !blob.error &&
                  <Icon type="loading"/>
                }
                { blob.error &&
                  <Icon type="frown-circle" />
                }
              </h1>
            }
          </Col>
          <Col span="7" className="action">
            <div className="action-list">
              <div className="action-list-toggle">
                <Icon type="ellipsis" />
              </div>
              <ul className="action-list-dropdown">
                <li className="item"><a href={blob.data.html_url} target="_blank"><Icon type="code" /> Source</a></li>
                <li className="item"><a onClick={this.remove.bind(this)}><Icon type="delete" /> Remove</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Head;
