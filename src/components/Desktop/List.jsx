import React, { Component, PropTypes } from 'react';
import Icon from 'antd/lib/icon';

import classNames from 'classnames';
import { Link } from 'react-router';

class List extends Component {

  static propTypes = {
    tree: PropTypes.object,
  }

  render() {
    const { tree } = this.props;
    let files;
    if (tree.loaded) {
      files = (
        tree.data.map(item => {
          let fileName = item.name.split(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-/);
          fileName = fileName[4] || item.name;
          const filePath = item.path.split('_posts/')[1];
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
          );
        })
      );
    }
    return (
      <div className="leaf-desktop-list">
        { !tree.loaded &&
          <div className="leaf-desktop-list-loading">
            { !tree.error &&
              <Icon type="loading" />
            }
            { tree.error &&
              <Icon type="frown-circle" />
            }
          </div>
        }
        { tree.loaded &&
          <ul className="leaf-desktop-list-cnt clearfix">
          {files}
          </ul>
        }
      </div>
    );
  }
}

export default List;
