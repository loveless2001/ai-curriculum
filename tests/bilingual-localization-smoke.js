/* Dependency-free localization smoke test. Run: node tests/bilingual-localization-smoke.js */
'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var root = path.resolve(__dirname, '..');

var dataFiles = [
  'js/data/jargon-dictionary-entries.js',
  'js/data/arc1-prediction-before-machines-weeks.js',
  'js/data/arc2-what-counts-as-knowing-weeks.js',
  'js/data/arc3-the-machine-weeks.js',
  'js/data/arc4-under-the-hood-weeks.js',
];
var vietnameseFiles = [
  'js/i18n/vietnamese-arc1.js',
  'js/i18n/vietnamese-arc2.js',
  'js/i18n/vietnamese-arc3.js',
  'js/i18n/vietnamese-arc4-and-dictionary.js',
];

function load(language, extraFiles) {
  var context = {
    console: console,
    location: { reload: function () {} },
    localStorage: {
      getItem: function (key) { return key === 'guessing-machines-language-v1' ? language : null; },
      setItem: function () {},
    },
  };
  context.window = context;
  vm.createContext(context);
  ['js/dom-helpers-and-namespace.js', 'js/progress-store-local-storage.js'].concat(dataFiles, vietnameseFiles, extraFiles || []).forEach(function (filename) {
    vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename: filename });
  });
  return context;
}

var english = load('en').GM;
assert.strictEqual(english.weeks.length, 12);
assert.strictEqual(english.weeks[0].title, 'How context shapes a guess');
assert.strictEqual(english.arcs[0].shortName, 'Arc 1 · Prediction');
var englishWeek2 = english.weeks.find(function (week) { return week.num === 2; });
assert.strictEqual(englishWeek2.beats.length, 8);
assert.strictEqual(englishWeek2.beats[1].title, 'Predict first: information needs a receiver');
assert.match(englishWeek2.checkpointStatement, /same message can carry different amounts of information/);
assert.doesNotMatch(englishWeek2.beats.map(function (beat) { return beat.html || ''; }).join(' '), /No surprise, no learning/);

var widgetFiles = fs.readdirSync(path.join(root, 'js/widgets')).sort().map(function (name) { return 'js/widgets/' + name; });
var vietnameseContext = load('vi', widgetFiles);
var vietnamese = vietnameseContext.GM;
assert.strictEqual(vietnamese.weeks.length, 12);
assert.strictEqual(vietnamese.arcs.length, 4);
assert.strictEqual(vietnamese.jargon.length, 8);
assert.strictEqual(Object.keys(vietnamese.widgets).length, 16);
assert.strictEqual(vietnamese.weeks[0].title, 'Ngữ cảnh định hướng dự đoán như thế nào');
assert.strictEqual(vietnamese.weeks[11].title, 'Từ bộ dự đoán văn bản đến chatbot');
assert.strictEqual(vietnamese.jargon[0].folk, 'trò đoán');
var vietnameseWeek2 = vietnamese.weeks.find(function (week) { return week.num === 2; });
assert.strictEqual(vietnameseWeek2.beats.length, 8);
assert.strictEqual(vietnameseWeek2.beats[1].title, 'Dự đoán trước: thông tin cần một người nhận');
assert.match(vietnameseWeek2.checkpointStatement, /cùng một thông điệp/);
assert.doesNotMatch(vietnameseWeek2.beats.map(function (beat) { return beat.html || ''; }).join(' '), /Không bất ngờ, không học hỏi/);

vietnamese.weeks.forEach(function (week) {
  var text = [week.title, week.tagline, week.checkpointStatement]
    .concat(week.beats.map(function (beat) { return (beat.title || '') + ' ' + (beat.html || ''); }))
    .join(' ');
  assert.match(text, /[À-ỹĐđ]/, 'week ' + week.num + ' should contain Vietnamese prose');
  assert.doesNotMatch(text, /Read this aloud|The machine below|Before any explanation|Same prompt, submitted|The last naming beat/,
    'week ' + week.num + ' retained an English lesson sentinel');
  week.beats.forEach(function (beat, index) {
    assert.match((beat.title || '') + ' ' + (beat.html || ''), /[À-ỹĐđ]/,
      'week ' + week.num + ' beat ' + (index + 1) + ' should be localized');
  });
});

var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
vietnameseFiles.forEach(function (filename) {
  assert.ok(html.indexOf(filename) !== -1, filename + ' must be loaded by index.html');
});
assert.ok(html.indexOf(vietnameseFiles[3]) < html.indexOf('js/views/home-overview-and-principles-view.js'),
  'localized course overlays must load before views');

var baseCss = fs.readFileSync(path.join(root, 'css/base-theme-and-design-tokens.css'), 'utf8');
assert.match(baseCss, /html\[lang="vi"\][\s\S]*--font-serif:[^;]*"Noto Sans"/,
  'Vietnamese should use one diacritic-complete reading and display stack');
assert.doesNotMatch(baseCss, /"Charter"|"Iowan Old Style"|Georgia|Cambria/,
  'font stacks with inconsistent Vietnamese coverage should not return');

function FakeNode(tag, text) {
  this.tagName = tag;
  this.children = [];
  this.style = {};
  this.attributes = {};
  this.className = '';
  this.textContent = text || '';
  this.value = '';
  this.disabled = false;
  this._html = '';
  this._listeners = {};
  var self = this;
  this.classList = {
    add: function (name) { if (!self.classList.contains(name)) self.className += (self.className ? ' ' : '') + name; },
    remove: function (name) { self.className = self.className.split(/\s+/).filter(function (part) { return part && part !== name; }).join(' '); },
    contains: function (name) { return self.className.split(/\s+/).indexOf(name) !== -1; },
    toggle: function (name, force) {
      var add = force === undefined ? !self.classList.contains(name) : force;
      if (add) self.classList.add(name); else self.classList.remove(name);
      return add;
    },
  };
}
FakeNode.prototype.appendChild = function (child) { this.children.push(child); return child; };
FakeNode.prototype.insertBefore = function (child) { this.children.unshift(child); return child; };
FakeNode.prototype.addEventListener = function (name, handler) { this._listeners[name] = handler; };
FakeNode.prototype.setAttribute = function (name, value) {
  this.attributes[name] = String(value);
  if (name === 'class') this.className = String(value);
  if (name === 'value') this.value = String(value);
};
FakeNode.prototype.querySelectorAll = function (selector) {
  var found = [];
  function visit(node) {
    node.children.forEach(function (child) {
      if (!(child instanceof FakeNode)) return;
      if ((selector[0] === '.' && child.classList.contains(selector.slice(1))) ||
          (selector[0] !== '.' && child.tagName === selector)) found.push(child);
      visit(child);
    });
  }
  visit(this);
  return found;
};
Object.defineProperty(FakeNode.prototype, 'innerHTML', {
  get: function () { return this._html; },
  set: function (value) { this._html = String(value); this.children = []; },
});
Object.defineProperty(FakeNode.prototype, 'firstChild', {
  get: function () { return this.children[0] || null; },
});

vietnameseContext.document = {
  createElement: function (tag) { return new FakeNode(tag); },
  createTextNode: function (text) { return new FakeNode('#text', text); },
  dispatchEvent: function () {},
};
vietnameseContext.CustomEvent = function (name) { this.type = name; };
var widgetOptions = {
  'cloze-game': { mode: 'human' },
  'calibration-quiz': { round: 1 },
};
var mountedText = [];
function collectVisible(node) {
  mountedText.push(node.textContent || '', node.innerHTML || '');
  Object.keys(node.attributes || {}).forEach(function (key) { mountedText.push(node.attributes[key]); });
  node.children.forEach(function (child) { if (child instanceof FakeNode) collectVisible(child); });
}
Object.keys(vietnamese.widgets).forEach(function (name) {
  var container = new FakeNode('div');
  vietnamese.widgets[name](container, widgetOptions[name] || {});
  assert.ok(container.children.length > 0, name + ' should mount visible content');
  collectVisible(container);
});
assert.doesNotMatch(mountedText.join(' '), /The difficulty ladder|Reveal source|Score my round|Start a fresh conversation|Generate 5 times|Ask a question|Your lab log|Run the test|Play Betty|Compress the story/,
  'a Vietnamese widget retained an English interface sentinel');

console.log('bilingual localization smoke: PASS (12 weeks, 4 arcs, 16 widgets)');
