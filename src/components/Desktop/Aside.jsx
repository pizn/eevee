import React, { Component, PropTypes } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import { Link } from 'react-router';
import classNames from 'classnames';

class Aside extends Component {

  logout() {
    const { logout } = this.props;
    logout();
  }
  render() {
    const { user, repoInfo, tree } = this.props;

    const logoCls = classNames({
      'head-logo': true,
      'head-logo-loading': user.loading | repoInfo.loading | tree.loading,
    });

    return (
      <div className="leaf-desktop-aside">
        <div className="head">
          <div className={logoCls}></div>
        </div>
        <div className="body">
          { !tree.loaded &&
          <div className="body-project-title">
            <Icon type="loading" />
          </div>
          }
          { tree.loaded &&
          <ul className="body-menu">
            <li className="body-menu-item">
              <Link to={`_posts`} className="link" activeClassName="link-active">
                <span className="icon"><Icon type="inbox" /></span>
                <span className="count">{tree.data.length}</span>
              </Link>
              <p className="text">文章</p>
            </li>
            <li className="body-menu-item">
              <div className="link">
                <span className="icon"><Icon type="file-text" /></span>
              </div>
              <p className="text">草稿</p>
            </li>
            <li className="body-menu-item">
              <div className="link">
                <span className="icon"><Icon type="picture" /></span>
              </div>
              <p className="text">素材</p>
            </li>
            <li className="body-menu-item">
              <div className="link">
                <span className="icon"><Icon type="setting" /></span>
              </div>
              <p className="text">配置</p>
            </li>
          </ul>
          }
        </div>

        <div className="foot">
          { !user.loading &&
          <Row className="foot-user">
            <Col span="4">
              <img className="foot-user-avatar" src={user.data.avatar_url} />
            </Col>
            <Col span="20" className="foot-user-info">
              <p className="name">{user.data.name || user.data.login}</p>
              <p className="email">{user.data.email}</p>
            </Col>
            <ul className="foot-user-actions">
              <li className="item">
                <a onClick={this.logout.bind(this)} >登出 <Icon type="logout" /></a>
              </li>
            </ul>
          </Row>
          }
        </div>
      </div>
    )
  }
}

export default Aside;
