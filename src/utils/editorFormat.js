const FORMATS = {
  h1: { type: 'block', token: 'header-1', before: '#', re: /^#\s+/, placeholder: '大标题' },
  h2: { type: 'block', token: 'header-2', before: '##', re: /^##\s+/, placeholder: '中标题' },
  h3: { type: 'block', token: 'header-3', before: '###', re: /^###\s+/, placeholder: '小标题' },
  bold: { type: 'inline', token: 'strong', before: '**', after: '**', placeholder: 'bold text' },
  italic: { type: 'inline', token: 'em', before: '_', after: '_', placeholder: 'italic text' },
  quote: { type: 'block', token: 'quote', re: /^\>\s+/, before: '>', placeholder: 'quote' },
  oList: { type: 'block', before: '1. ', re: /^\d+\.\s+/, placeholder: 'List' },
  uList: { type: 'block', before: '* ', re: /^[\*\-]\s+/, placeholder: 'List' },
  link: { type: 'inline', token: 'link', before: '[', after: ']()', placeholder: 'Link' },
  image: { type: 'inline', token: 'image', before: '![', after: ']()', placeholder: 'Image' },
  code: { type: 'inline', token: 'code', before: '`', after: '`', placeholder: 'code' },
  del: { type: 'inline', token: 'strikethrough', before: '~~', after: '~~', placeholder: 'del' },
};

const FORMAT_TOKENS = {};
Object.keys(FORMATS).forEach(key => {
  if (FORMATS[key].token) FORMAT_TOKENS[FORMATS[key].token] = key;
});

export function getCursorState(cm, pos) {
  let currentPos;
  currentPos = pos || cm.getCursor('start');
  var cs = {
    render: false
  };
  var token = cs.token = cm.getTokenAt(currentPos);
  if (!token.type) return cs;
  var tokens = token.type.split(' ');
  tokens.forEach(t => {
    if (FORMAT_TOKENS[t]) {
      cs[FORMAT_TOKENS[t]] = true;
      cs.render = true;
      return;
    }
    switch (t) {
      case 'link':
        cs.link = true;
        cs.link_label = true;
        cs.render = true;
        break;
      case 'string':
        cs.link = true;
        cs.link_href = true;
        cs.render = true;
        break;
      case 'comment':
        cs.code = true;
        cs.render = true;
        break;
      case 'variable-2':
        var text = cm.getLine(currentPos.line);
        if (/^\s*\d+\.\s/.test(text)) {
          cs.oList = true;
          cs.render = true;
        } else {
          cs.uList = true;
          cs.render = true;
        }
        break;
      default:
        break;
    }
  });
  return cs;
}

var operations = {
  inlineApply(cm, format) {
    var startPoint = cm.getCursor('start');
    var endPoint = cm.getCursor('end');
    var selection = cm.getSelection();
    cm.replaceSelection(format.before + selection + format.after);
    startPoint.ch += format.before.length;
    endPoint.ch += format.after.length;

    if (format.token === 'link') {
      if (selection === '') {
        // 如果是新建,则聚焦到内容里面
        cm.setSelection(startPoint, cm.getCursor('end') - 2);
      } else {
        // 如果是选中,则聚焦到连接里面
        cm.setSelection(endPoint, cm.getCursor('end') - 1);
      }
    } else if (format.token === 'image') {
      if (selection === '') {
        // 如果是新建,则聚焦到内容里面
        cm.setSelection(startPoint, cm.getCursor('end') - 2);
      } else {
        // 如果是选中,则聚焦到连接里面
        cm.setSelection(endPoint, cm.getCursor('end'));
      }
    } else {
      cm.setSelection(startPoint, endPoint);
    }

    cm.focus();
  },
  inlineRemove(cm, format) {
    var startPoint = cm.getCursor('start');
    var endPoint = cm.getCursor('end');
    var line = cm.getLine(startPoint.line);
    var startPos = startPoint.ch;

    while (startPos) {
      if (line.substr(startPos, format.before.length) === format.before) {
        break;
      }
      startPos--;
    }

    var endPos = endPoint.ch;
    while (endPos <= line.length) {
      if (line.substr(endPos, format.after.length) === format.after) {
        break;
      }
      endPos++;
    }

    var start = line.slice(0, startPos);
    var mid = line.slice(startPos + format.before.length, endPos);
    var end = line.slice(endPos + format.after.length);
    cm.replaceRange(start + mid + end, { line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: line.length + 1 });
    cm.setSelection({ line: startPoint.line, ch: start.length }, { line: startPoint.line, ch: (start + mid).length });
    cm.focus();
  },
  blockApply(cm, format) {
    var startPoint = cm.getCursor('start');
    var line = cm.getLine(startPoint.line);
    var text = format.before + ' ' + (line.length ? line : format.placeholder);
    cm.replaceRange(text, { line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: line.length + 1 });
    cm.setSelection({ line: startPoint.line, ch: format.before.length + 1 }, { line: startPoint.line, ch: text.length });
    cm.focus();
  },
  blockRemove(cm, format) {
    var startPoint = cm.getCursor('start');
    var line = cm.getLine(startPoint.line);
    var text = line.replace(format.re, '');
    cm.replaceRange(text, { line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: line.length + 1 });
    cm.setSelection({ line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: text.length });
    cm.focus();
  }
};

export function applyFormat(cm, key) {
  var cs = getCursorState(cm);
  var format = FORMATS[key];
  operations[format.type + (cs[key] ? 'Remove' : 'Apply')](cm, format);
}
