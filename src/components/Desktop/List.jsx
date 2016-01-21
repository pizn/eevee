import React, { Component, PropTypes } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import classNames from 'classnames';
import { Link } from 'react-router';

class List extends Component {
  render() {
    const { tree } = this.props;
    const files = (
      tree.loaded && tree.data.map(item => {
        let fileName = item.name.split(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-/);
        fileName = fileName[4] || item.name;

        let filePath = item.path.split('_posts/')[1];

        const fileCls = classNames({
          'file': true,
          'file-f': item.type === 'file',
          'file-d': item.type === 'dir'
        });

        return (
          <li key={item.path} className={fileCls}>
            { item.type === 'file' &&
              <Link to={`/_posts/f/${filePath}`} className="file-card">
                <div className="file-card-type" />
                <div className="file-card-name">
                  {fileName}
                </div>
              </Link>
            }
            { item.type === 'dir' &&
              <Link to={`/_posts/d/${filePath}`} className="file-card">
                <div className="file-card-type" />
                <div className="file-card-name">
                  {item.name}
                </div>
              </Link>
            }
          </li>
        )
      })
    )
    return (
      <div className="leaf-desktop-list">
        { tree.loading &&
          <div className="leaf-desktop-list-loading">
            <Icon type="loading" />
          </div>
        }
        { !tree.loading &&
          <ul className="leaf-desktop-list-cnt clearfix">
          {files}
          </ul>
        }
      </div>
    );
  }
}

export default List;