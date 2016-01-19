import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import CM from 'codemirror';
import { getCursorState, applyFormat } from '../../utils/editorFormat';
import marked from  'marked';

import hljs from 'highlight.js';
import Key from 'keymaster';
import { Icon, Tooltip } from 'antd';
import '../../styles/EditIcon.less';
import '../../styles/CodeMirror.less';

marked.setOptions({
  renderer: new marked.Renderer()
});

require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/dockerfile/dockerfile');
require('codemirror/mode/go/go');
require('codemirror/mode/nginx/nginx');
require('codemirror/mode/shell/shell');
require('codemirror/mode/sql/sql');
require('codemirror/mode/swift/swift');
require('codemirror/mode/velocity/velocity');
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/http/http');
require('codemirror/mode/clike/clike');
require('codemirror/addon/edit/continuelist');

class Editor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isPreview: false,
      onScrolled: false,
      cs: {},
    }
  }

  componentDidMount () {
    const { value } = this.props;
    const editorNode = this.refs.editor;
    const that = this;
    this.codeMirror = CM.fromTextArea(editorNode, this.getOptions());
    this.codeMirror.on('change', this.codemirrorValueChanged.bind(this));
    this.codeMirror.on('cursorActivity', this.updateCursorState.bind(this));
    this._currentCodemirrorValue = value;

    // 保存
    Key('⌘+s, ctrl+s', function(e) {
      e.preventDefault();
      that.handleSave();
    });

    // 返回
    Key('⌘+shift+left', function(e) {
      e.preventDefault();
      that.handleBack();
    });

    // 预览
    Key('⌘+0, ctrl+0', function(e) {
      e.preventDefault();
      that.handlePreviewEvent();
    })
  }

  handleBack() {
    const { history } = this.props;
    history.pushState(null, '_posts/')
  }

  getOptions () {
    const that = this;
    return Object.assign({
      mode: 'gfm',
      lineNumbers: false,
      lineWrapping: true,
      indentWithTabs: true,
      matchBrackets: true,
      autofocus: true,
      tabSize: '2',
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList",
        "Cmd-S": function() {
          that.handleSave();
        },
        "Cmd-B": function() {
          that.toggleFormat('bold');
        },
        "Cmd-I": function() {
          that.toggleFormat('italic')
        },
        "Cmd-1": function() {
          that.toggleFormat('h1');
        },
        "Cmd-2": function() {
          that.toggleFormat('h2');
        },
        "Cmd-3": function() {
          that.toggleFormat('h3');
        },
        "Cmd-Alt-U": function() {
          that.toggleFormat('uList');
        },
        "Cmd-Alt-O": function() {
          that.toggleFormat('oList');
        },
        "Cmd-Alt-G": function() {
          that.toggleFormat('del');
        },
        "Cmd-Alt-C": function() {
          that.toggleFormat('code');
        },
        "Cmd-Alt-E": function() {
          that.toggleFormat('quote');
        },
        "Cmd-Alt-L": function() {
          that.toggleFormat('link');
        },
        "Cmd-Alt-P": function() {
          that.toggleFormat('image');
        },
        "Cmd-0": function() {
          that.handlePreviewEvent();
        }
      }
    }, this.props.options);
  }

  componentWillReceiveProps (nextProps) {
    if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value);
      this.codeMirror.refresh();
      this.codeMirror.focus();
    }
  }

  /*
   * 1. 切换视图
   * 2. 滚动条位置
   * 3. 选中文字
   * 4. 内容变化了
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isPreview !== this.state.isPreview || nextState.onScrolled !== this.state.onScrolled || nextState.cs.render || nextState.cs.render !== this.state.cs.render || nextProps.value !== this.props.value;
  }

  componentWillUnmount () {
    if (this.codeMirror) {
      this.codeMirror.setValue('');
      this.codeMirror.clearHistory();
      // http://stackoverflow.com/questions/18828658/how-to-kill-a-codemirror-instance
      this.codeMirror.toTextArea();
    }
  }

  updateCursorState () {
    this.setState({ cs: getCursorState(this.codeMirror) });
  }

  codemirrorValueChanged (doc, change) {
    const newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
  }

  toggleFormat (formatKey) {
    if (this.state.isPreview) {
      return;
    }
    applyFormat(this.codeMirror, formatKey);
  }

  renderIcon (icon) {
    return <span className={'edit-icon edit-icon-'+ icon} />;
  }

  renderButton (formatKey, label, action) {
    const { blob } = this.props;
    if (!action) action = this.toggleFormat.bind(this, formatKey);
    const className = classNames('leaf-editor-tool-icon',
      {
        'leaf-editor-tool-icon-active': this.state.cs[formatKey],
        'leaf-editor-tool-icon-disabled': this.state.isPreview || !blob.loaded
      },
      ('leaf-editor-tool-icon-' + formatKey));
    return (
      <Tooltip title={label} placement="bottom">
        <button className={className} onClick={action}>
          { this.renderIcon(formatKey) }
        </button>
      </Tooltip>
    );
  }

  handleScrollEditor() {
    if (this.refs.editorContainer.scrollTop > 0 && !this.state.onScrolled) {
      this.setState({ onScrolled: true });
    } else if (this.refs.editorContainer.scrollTop < 10) {
      this.setState({ onScrolled: false });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isPreview !== this.state.isPreview) {
      const start_time = new Date();
      let rawMarkup = marked(this._currentCodemirrorValue);
      this.previewMarkup = rawMarkup;
      console.info('[log] 渲染预览消耗 %s ms', new Date() - start_time);
    }
  }

  renderToolbar () {
    const { blob } = this.props;
    const previewClassName = classNames({
      'edit-icon': true,
      'edit-icon-eyes': !this.state.isPreview,
      'edit-icon-eyes-slash': this.state.isPreview
    });

    const previewIconActive = classNames({
      'leaf-editor-tool-icon': true,
      'leaf-editor-tool-icon-active': this.state.isPreview
    });

    const historyClassName = classNames({
      'leaf-editor-tool-icon': true,
      'leaf-editor-tool-icon-disabled': this.state.isPreview || !blob.loaded,
    });

    return (
      <div className="leaf-editor-tool-list">
        <Tooltip title="撤销 (Cmd+U)" placement="bottom">
          <button className={historyClassName} onClick={this.handleUndo.bind(this)}>
            <span className="edit-icon edit-icon-undo" />
          </button>
        </Tooltip>
        <Tooltip title="重做 (Cmd+Shift+U)" placement="bottom">
          <button className={historyClassName} onClick={this.handleRedo.bind(this)}>
            <span className="edit-icon edit-icon-redo" />
          </button>
        </Tooltip>
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('h1', 'H1 (Cmd+1)')}
        {this.renderButton('h2', 'H2 (Cmd+2)')}
        {this.renderButton('h3', 'H3 (Cmd+3)')}
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('bold', '粗体 (Cmd+B')}
        {this.renderButton('italic', '斜体 (Cmd+I)')}
        {this.renderButton('del', '删除线 (Cmd+Alt+G)')}
        {this.renderButton('quote', '引用 (Cmd+Alt+E)')}
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('oList', '有序列表 (Cmd+Alt+O)')}
        {this.renderButton('uList', '无序列表 (Cmd+Alt+U)')}
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('link', '超链接 (Cmd+Alt+L)')}
        {this.renderButton('image', '图片 (Cmd+Alt+P)')}
        {this.renderButton('code', '代码 (Cmd+Alt+C)')}
        <span className="leaf-editor-tool-separator" />
        <Tooltip placement="bottom" title="预览 (Cmd+0)">
          <button className={previewIconActive} onClick={this.handlePreviewEvent.bind(this)}>
            <span className={previewClassName} />
          </button>
        </Tooltip>
      </div>
    );
  }

  handlePenFocus() {
    event.preventDefault();
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  }

  handlePreviewEvent() {
    this.setState({
      isPreview: !this.state.isPreview
    });
  }

  handleSave() {
    const { handleSave } = this.props;
    // 重新组装
    handleSave && handleSave(this._currentCodemirrorValue);
  }

  handleUndo() {
    event.preventDefault();
    if (this.codeMirror && !this.state.isPreview) {
      this.codeMirror.undoSelection();
    }
  }

  handleRedo() {
    event.preventDefault();
    if (this.codeMirror && !this.state.isPreview) {
      this.codeMirror.redoSelection();
    }
  }

  render () {
    const { className, blob } = this.props;

    const editorClassName = classNames({
      'leaf-editor-wrap': true,
      'leaf-editor-wrap-preview': this.state.isPreview,
      [className]: className
    });
    const editorToolClassName = classNames({
      'leaf-editor-tool': true,
      'leaf-editor-tool-active': this.state.onScrolled,
    });
    const penClassName = classNames({
      'pen': true,
      'pen-hide': this.state.isPreview
    });
    const viewClassName = classNames({
      'view': true,
      'view-show': this.state.isPreview
    });
    const containerClassName = classNames({
      'leaf-editor-container': true,
      'clearfix': true,
      'leaf-editor-container-preview': this.state.isPreview
    });

    return (
      <div className="leaf-editor">
        <div className={editorToolClassName}>
        {this.renderToolbar()}
        </div>
        <div className={editorClassName} onScroll={this.handleScrollEditor.bind(this)} ref="editorContainer">
          <div className={containerClassName} >
            { !blob.loaded &&
              <div className="loading">
                <Icon type="loading" />
              </div>
            }
            <div className={penClassName}>
              <div className="content" onClick={this.handlePenFocus.bind(this)}>
                <textarea
                ref="editor"
                name={this.props.path}
                autoComplete="off"/>
              </div>
            </div>
            {this.state.isPreview &&
              <div className={viewClassName}>
                <div className="leaf-editor-github" dangerouslySetInnerHTML={{__html: this.previewMarkup}} />
              </div>
            }
          </div>
          <div className="leaf-editor-footer clearfix">
            <p>文章编写于 <a href="https://github.com/pizn/eevee" target="_blank">伊布</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
