import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import CM from 'codemirror/lib/codemirror';
import { getCursorState, applyFormat } from '../../utils/editorFormat';

import marked from 'marked/lib/marked';
// import hljs from 'highlight.js/lib/highlight.js';
import key from 'keymaster';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
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
    history: PropTypes.object,
    blob: PropTypes.object,
    params: PropTypes.object,
    handleSave: PropTypes.func,
    className: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isPreview: false,
      onScrolled: false,
      cs: {},
    };
  }

  componentDidMount() {
    const { value } = this.props;
    const editorNode = this.refs.editor;
    const that = this;
    this.codeMirror = CM.fromTextArea(editorNode, this.getOptions());
    this.codeMirror.on('change', this.codemirrorValueChanged.bind(this));
    this.codeMirror.on('cursorActivity', this.updateCursorState.bind(this));
    this._currentCodemirrorValue = value;

    // 保存
    key('⌘+s, ctrl+s', (e) => {
      e.preventDefault();
      that.handleSave();
    });

    // 返回
    key('⌘+shift+left', (e) => {
      e.preventDefault();
      that.handleBack();
    });

    // 预览
    key('⌘+0, ctrl+0', (e) => {
      e.preventDefault();
      that.handlePreviewEvent();
    });
  }

  componentWillReceiveProps(nextProps) {
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

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isPreview !== this.state.isPreview) {
      this.previewMarkup = marked(this._currentCodemirrorValue);
    }
  }

  componentWillUnmount() {
    if (this.codeMirror) {
      this.codeMirror.setValue('');
      this.codeMirror.clearHistory();
      // http://stackoverflow.com/questions/18828658/how-to-kill-a-codemirror-instance
      this.codeMirror.toTextArea();
    }
  }

  getOptions() {
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
        'Enter': 'newlineAndIndentContinueMarkdownList',
        'Cmd-S': () => {
          that.handleSave();
        },
        'Cmd-B': () => {
          that.toggleFormat('bold');
        },
        'Cmd-I': () => {
          that.toggleFormat('italic');
        },
        'Cmd-1': () => {
          that.toggleFormat('h1');
        },
        'Cmd-2': () => {
          that.toggleFormat('h2');
        },
        'Cmd-3': () => {
          that.toggleFormat('h3');
        },
        'Cmd-Alt-U': () => {
          that.toggleFormat('uList');
        },
        'Cmd-Alt-O': () => {
          that.toggleFormat('oList');
        },
        'Cmd-Alt-G': () => {
          that.toggleFormat('del');
        },
        'Cmd-Alt-C': () => {
          that.toggleFormat('code');
        },
        'Cmd-Alt-E': () => {
          that.toggleFormat('quote');
        },
        'Cmd-Alt-L': () => {
          that.toggleFormat('link');
        },
        'Cmd-Alt-P': () => {
          that.toggleFormat('image');
        },
        'Cmd-0': () => {
          that.handlePreviewEvent();
        },
      },
    }, this.props.options);
  }

  updateCursorState() {
    this.setState({ cs: getCursorState(this.codeMirror) });
  }

  codemirrorValueChanged(doc) {
    const newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
  }

  toggleFormat(formatKey) {
    if (this.state.isPreview) {
      return;
    }
    applyFormat(this.codeMirror, formatKey);
  }

  handleScrollEditor() {
    if (this.refs.editorContainer.scrollTop > 0 && !this.state.onScrolled) {
      this.setState({ onScrolled: true });
    } else if (this.refs.editorContainer.scrollTop < 10) {
      this.setState({ onScrolled: false });
    }
  }

  handleBack() {
    const { history, blob, params } = this.props;
    let backDir = '';
    if (blob.loaded) {
      backDir = params.splat.split(blob.data.name)[0];
      backDir = backDir !== '' ? 'd/' + backDir : '';
    }
    history.pushState(null, '/_posts/' + backDir);
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
    if (handleSave) {
      handleSave(this._currentCodemirrorValue);
    }
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

  renderIcon(icon) {
    return <span className={'edit-icon edit-icon-' + icon} />;
  }

  renderButton(formatKey, label, action) {
    const { blob } = this.props;
    let actionTmp;
    if (!action) {
      actionTmp = this.toggleFormat.bind(this, formatKey);
    } else {
      actionTmp = action;
    }
    const className = classNames('leaf-editor-tool-icon',
      {
        'leaf-editor-tool-icon-active': this.state.cs[formatKey],
        'leaf-editor-tool-icon-disabled': this.state.isPreview || !blob.loaded
      },
      ('leaf-editor-tool-icon-' + formatKey));
    return (
      <Tooltip title={label} placement="bottom">
        <button className={className} onClick={actionTmp}>
          { this.renderIcon(formatKey) }
        </button>
      </Tooltip>
    );
  }

  renderToolbar() {
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
        <Tooltip title="Undo (Cmd+U)" placement="bottom">
          <button className={historyClassName} onClick={this.handleUndo.bind(this)}>
            <span className="edit-icon edit-icon-undo" />
          </button>
        </Tooltip>
        <Tooltip title="Redo (Cmd+Shift+U)" placement="bottom">
          <button className={historyClassName} onClick={this.handleRedo.bind(this)}>
            <span className="edit-icon edit-icon-redo" />
          </button>
        </Tooltip>
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('h1', 'H1 (Cmd+1)')}
        {this.renderButton('h2', 'H2 (Cmd+2)')}
        {this.renderButton('h3', 'H3 (Cmd+3)')}
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('bold', 'Blod (Cmd+B')}
        {this.renderButton('italic', 'Italic (Cmd+I)')}
        {this.renderButton('del', 'Strikethrough (Cmd+Alt+G)')}
        {this.renderButton('quote', 'Quote (Cmd+Alt+E)')}
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('oList', 'Order List (Cmd+Alt+O)')}
        {this.renderButton('uList', 'Unorder List (Cmd+Alt+U)')}
        <span className="leaf-editor-tool-separator" />
        {this.renderButton('link', 'Link (Cmd+Alt+L)')}
        {this.renderButton('image', 'Image (Cmd+Alt+P)')}
        {this.renderButton('code', 'Code (Cmd+Alt+C)')}
        <span className="leaf-editor-tool-separator" />
        <Tooltip placement="bottom" title="Preview (Cmd+0)">
          <button className={previewIconActive} onClick={this.handlePreviewEvent.bind(this)}>
            <span className={previewClassName} />
          </button>
        </Tooltip>
      </div>
    );
  }

  render() {
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
                { !blob.error &&
                  <Icon type="loading" />
                }
              </div>
            }
            <div className={penClassName}>
              <div className="content" onClick={this.handlePenFocus.bind(this)}>
                <textarea
                  ref="editor"
                  name={this.props.path}
                  autoComplete="off"
                />
              </div>
            </div>
            {this.state.isPreview &&
              <div className={viewClassName}>
                <div className="leaf-editor-github" dangerouslySetInnerHTML={{ __html: this.previewMarkup }} />
              </div>
            }
          </div>
          <div className="leaf-editor-footer clearfix">
            <p>Build with <span className="love">Love</span> in <a href="https://github.com/pizn/eevee" target="_blank">Eevee</a>.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
