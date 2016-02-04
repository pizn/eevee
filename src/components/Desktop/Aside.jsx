import React, { Component, PropTypes } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import { Link } from 'react-router';
import classNames from 'classnames';

class Aside extends Component {

  static propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object,
    repoInfo: PropTypes.object,
    tree: PropTypes.object,
  }

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

    const countCls = classNames({
      'count': true,
      'count-active': tree.loaded,
    });

    return (
      <div className="leaf-desktop-aside">
        <div className="head">
          <div className={logoCls}></div>
        </div>
        <div className="body">
          <ul className="body-menu">
            <li className="body-menu-item">
              <Link to={`/_posts`} className="link" activeClassName="link-active">
                <span className="icon"><Icon type="inbox" /></span>
                <span className={countCls}>
                  <span>{tree.data.length}</span>
                </span>
              </Link>
              <p className="text">_posts</p>
            </li>
            <li className="body-menu-item">
              <div className="link">
                <span className="icon"><Icon type="file-text" /></span>
              </div>
              <p className="text">_drafts</p>
            </li>
            <li className="body-menu-item">
              <div className="link">
                <span className="icon"><Icon type="picture" /></span>
              </div>
              <p className="text">_media</p>
            </li>
            <li className="body-menu-item">
              <div className="link">
                <span className="icon"><Icon type="setting" /></span>
              </div>
              <p className="text">_setting</p>
            </li>
          </ul>
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
                <a onClick={this.logout.bind(this)} ><Icon type="poweroff" />Disconnect</a>
              </li>
            </ul>
          </Row>
          }
          <Row className="foot-copyright">
            <p>Build with <span className="love">Love</span> in <a href="https://github.com/pizn/eevee" target="_blank">Eevee</a>.</p>
          </Row>
        </div>
      </div>
    );
  }
}

export default Aside;
