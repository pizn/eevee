import React, { Component, PropTypes } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import { Link } from 'react-router';

class Head extends Component {

  static propTypes = {
    logout: PropTypes.func,
    addFile: PropTypes.func,
    repoInfo: PropTypes.object,
    params: PropTypes.object,
  }

  render() {
    const { addFile, repoInfo, params } = this.props;
    let crumb;
    if (params && params.splat) {
      const crumbData = params.splat.split('/');
      const child = crumbData.map((item, index) => {
        const data = {
          name: item,
          path: crumbData.slice(0, index + 1).join('/'),
        };
        return (
          <span key={index}>
            { index === crumbData.length - 1 &&
              <span><Icon type="right" />{item}</span>
            }
            { index !== crumbData.length - 1 &&
              <span>
                <Icon type="right" /><Link to={`/_posts/d/${data.path}`}>{data.name}</Link>
              </span>
            }
          </span>
        );
      });

      crumb = (
        <span>
          <Link to="/_posts" >_posts</Link>
          {child}
        </span>
      );
    } else {
      crumb = `_posts`;
    }

    return (
      <div className="leaf-desktop-head">
          { repoInfo.loaded &&
            <Row className="leaf-head-wrap">
              <Col span="20">
                <h2 className="title">
                  <Link to="/_posts">{repoInfo.data.name}</Link>
                  <Icon type="right" />
                  {crumb}
                </h2>
              </Col>
              <Col span="4" className="action">
                <Button type="ghost" onClick={addFile}><Icon type="plus" /> Create</Button>
              </Col>
            </Row>
          }
      </div>
    );
  }
}

export default Head;
