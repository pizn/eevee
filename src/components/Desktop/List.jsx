import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router';

class List extends Component {
  render() {
    const { tree } = this.props;
    const files = (
      tree.loaded && tree.data.map(item => {

        let fileName = item.name.split(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-/);
        fileName = fileName[4] || item.name;

        return (
          <li key={item.sha} className="file">
            <Link to={`/${item.path}`} className="file-card">
              <div className="file-card-type">
              </div>
              <div className="file-card-name">
                {fileName}
              </div>
            </Link>
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