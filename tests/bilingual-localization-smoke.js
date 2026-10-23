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
var postLocalizationFiles = [
  'js/data/weeks-03-04-models-and-transfer-revision.js',
  'js/data/practical-applications-register.js',
  'js/data/practical-applications-arc1.js',
  'js/data/practical-applications-arc2.js',
  'js/data/practical-applications-arc3.js',
  'js/data/practical-applications-arc4.js',
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
  ['js/dom-helpers-and-namespace.js', 'js/progress-store-local-storage.js']
    .concat(dataFiles, vietnameseFiles, postLocalizationFiles, extraFiles || [])
    .forEach(function (filename) {
    vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename: filename });
  });
  return context;
}

var english = load('en').GM;
assert.strictEqual(english.weeks.length, 12);
assert.strictEqual(english.weeks[0].title, 'How context shapes a guess');
assert.strictEqual(english.arcs[0].shortName, 'Arc 1 · Prediction');
var englishWeek2 = english.weeks.find(function (week) { return week.num === 2; });
assert.strictEqual(englishWeek2.beats.length, 9);
assert.strictEqual(englishWeek2.beats[1].title, 'Predict first: information needs a receiver');
assert.match(englishWeek2.checkpointStatement, /same message can carry different amounts of information/);
assert.doesNotMatch(englishWeek2.beats.map(function (beat) { return beat.html || ''; }).join(' '), /No surprise, no learning/);
var englishWeek3 = english.weeks.find(function (week) { return week.num === 3; });
assert.match(englishWeek3.beats[0].html, /what else would you need to know\?/i);
assert.doesNotMatch(englishWeek3.beats[0].html, /connections let you assemble/i);
var englishWeek5 = english.weeks.find(function (week) { return week.num === 5; });
assert.match(englishWeek5.beats[0].html, /predict what would happen[\s\S]*<details class="answer-reveal"><summary>See what the test found<\/summary>/);
assert.ok(englishWeek5.beats[0].html.indexOf('Hans did much worse') > englishWeek5.beats[0].html.indexOf('</summary>'));
assert.match(englishWeek5.beats[1].html, /cancelled the interview[\s\S]*<details class="answer-reveal"><summary>What would this test show\?<\/summary>/);
assert.match(englishWeek5.beats[1].html, /Joseph Weizenbaum[\s\S]*DOCTOR[\s\S]*10\.1145\/365153\.365168/);
var englishSummaryApplication = englishWeek5.beats.find(function (beat) { return beat.kind === 'application'; });
assert.strictEqual(englishSummaryApplication.title, 'Why did the summary get better?');
assert.match(englishSummaryApplication.html, /same minutes[\s\S]*add only the sample, then only the instruction/);
assert.match(englishSummaryApplication.html, /Fictional meeting notes[\s\S]*First AI draft[\s\S]*Two illustrative results/);
var englishWriting = englishWeek3.beats.find(function (beat) { return beat.kind === 'application'; });
assert.match(englishWriting.html, /Which would you use in a guide for colleagues\?/);
assert.strictEqual(englishWriting.widgetOpts.fields.length, 3);
assert.match(englishWeek2.beats.find(function (beat) { return beat.kind === 'application'; }).html, /drink shop[\s\S]*change the decision/);
assert.match(english.weeks.find(function (week) { return week.num === 4; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /remote[\s\S]*personal computer/);
assert.match(english.weeks.find(function (week) { return week.num === 9; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /N1[\s\S]*resolved 28/);
assert.match(english.weeks.find(function (week) { return week.num === 10; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /Six fictional comments[\s\S]*two new ones/);
assert.match(english.weeks.find(function (week) { return week.num === 11; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /Section 2[\s\S]*Check the policy/);
english.weeks.forEach(function (week) {
  var applications = week.beats.filter(function (beat) { return beat.kind === 'application'; });
  assert.strictEqual(applications.length, 1, 'week ' + week.num + ' should have one practical example');
  assert.ok(week.beats.indexOf(applications[0]) < week.beats.findIndex(function (beat) { return beat.kind === 'checkpoint'; }),
    'week ' + week.num + ' practical example should appear before its checkpoint');
  assert.strictEqual(applications[0].widget, 'application-notebook');
});

var bridgeWidgetOrder = ['model-network-core.js', 'model-map-builder-and-route-tasks.js',
  'model-structure-and-limits-labs.js', 'model-reflection-notes.js'];
var widgetFiles = fs.readdirSync(path.join(root, 'js/widgets')).sort()
  .filter(function (name) { return bridgeWidgetOrder.indexOf(name) === -1; })
  .concat(bridgeWidgetOrder)
  .map(function (name) { return 'js/widgets/' + name; });
var vietnameseContext = load('vi', widgetFiles);
var vietnamese = vietnameseContext.GM;
assert.strictEqual(vietnamese.weeks.length, 12);
assert.strictEqual(vietnamese.arcs.length, 4);
assert.strictEqual(vietnamese.jargon.length, 8);
assert.strictEqual(Object.keys(vietnamese.widgets).length, 23);
assert.strictEqual(vietnamese.weeks[0].title, 'Ngữ cảnh giúp ta đoán như thế nào');
assert.strictEqual(vietnamese.weeks[11].title, 'Từ mô hình dự đoán văn bản đến chatbot');
assert.strictEqual(vietnamese.jargon[0].folk, 'trò đoán');
var vietnameseWeek2 = vietnamese.weeks.find(function (week) { return week.num === 2; });
assert.strictEqual(vietnameseWeek2.beats.length, 9);
assert.strictEqual(vietnameseWeek2.beats[1].title, 'Trước và sau khi nhận tin');
assert.match(vietnameseWeek2.checkpointStatement, /cùng một thông báo/);
assert.doesNotMatch(vietnameseWeek2.beats.map(function (beat) { return beat.html || ''; }).join(' '), /Không bất ngờ, không học hỏi/);
var vietnameseWeek3 = vietnamese.weeks.find(function (week) { return week.num === 3; });
assert.match(vietnameseWeek3.beats[0].html, /Nếu chưa, bạn cần biết thêm gì\?/);
assert.doesNotMatch(vietnameseWeek3.beats[0].html, /các địa điểm nối với nhau như thế nào/);
var vietnameseWeek5 = vietnamese.weeks.find(function (week) { return week.num === 5; });
assert.match(vietnameseWeek5.beats[0].html, /thử đoán:[\s\S]*<details class="answer-reveal"><summary>Xem kết quả kiểm tra<\/summary>/);
assert.ok(vietnameseWeek5.beats[0].html.indexOf('Hans trả lời kém hẳn') > vietnameseWeek5.beats[0].html.indexOf('</summary>'));
assert.match(vietnameseWeek5.beats[1].html, /Họ vừa báo hủy buổi phỏng vấn[\s\S]*<details class="answer-reveal"><summary>Câu trả lời cho biết gì\?<\/summary>/);
assert.match(vietnameseWeek5.beats[1].html, /Joseph Weizenbaum[\s\S]*DOCTOR[\s\S]*10\.1145\/365153\.365168/);
var vietnameseSummaryApplication = vietnameseWeek5.beats.find(function (beat) { return beat.kind === 'application'; });
assert.strictEqual(vietnameseSummaryApplication.title, 'Vì sao bản tóm tắt trở nên tốt hơn?');
assert.match(vietnameseSummaryApplication.html, /cùng biên bản[\s\S]*một lần chỉ thêm bài mẫu, một lần chỉ thêm lời dặn/);
assert.match(vietnameseSummaryApplication.html, /Ghi chú cuộc họp \(giả\)[\s\S]*Bản AI đầu tiên[\s\S]*Hai kết quả giả định/);
var vietnameseWriting = vietnameseWeek3.beats.find(function (beat) { return beat.kind === 'application'; });
assert.match(vietnameseWriting.html, /Viết cho đồng nghiệp thì bạn chọn câu nào\?/);
assert.strictEqual(vietnameseWriting.widgetOpts.fields.length, 3);
assert.match(vietnameseWeek2.beats.find(function (beat) { return beat.kind === 'application'; }).html, /tiệm nước[\s\S]*quyết định thay đổi/);
assert.match(vietnamese.weeks.find(function (week) { return week.num === 4; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /làm từ xa[\s\S]*máy cá nhân/);
assert.match(vietnamese.weeks.find(function (week) { return week.num === 9; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /G1[\s\S]*xử lý 28/);
assert.match(vietnamese.weeks.find(function (week) { return week.num === 10; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /Sáu phản hồi giả[\s\S]*Phản hồi 7 thuộc hỗ trợ/);
assert.match(vietnamese.weeks.find(function (week) { return week.num === 11; }).beats.find(function (beat) { return beat.kind === 'application'; }).html, /Mục 2[\s\S]*Đối chiếu quy định/);

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
  var application = week.beats.filter(function (beat) { return beat.kind === 'application'; });
  assert.strictEqual(application.length, 1, 'Vietnamese week ' + week.num + ' should have one practical example');
  assert.match(application[0].title + ' ' + application[0].html, /[À-ỹĐđ]/);
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
FakeNode.prototype.replaceChildren = function () { this.children = Array.prototype.slice.call(arguments); };
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
  createElementNS: function (_, tag) { return new FakeNode(tag); },
  createTextNode: function (text) { return new FakeNode('#text', text); },
  dispatchEvent: function () {},
};
vietnameseContext.CustomEvent = function (name) { this.type = name; };
var widgetOptions = {
  'cloze-game': { mode: 'human' },
  'calibration-quiz': { round: 1 },
  'bridge-notes': { id: 'smoke', prompts: [['Test prompt', 'Câu hỏi kiểm tra']] },
  'application-notebook': { id: 'smoke', fields: [{ label: 'Ghi chú' }] },
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
var elizaGame = new FakeNode('div');
vietnamese.widgets['ascription-game'](elizaGame);
elizaGame.querySelectorAll('button')[0]._listeners.click();
var elizaFeedback = elizaGame.querySelectorAll('.feedback').map(function (node) { return node.innerHTML; }).join(' ');
assert.match(elizaFeedback, /Tối qua chị ấy ngồi nghe tôi kể chuyện/);
assert.match(elizaFeedback, /kịch bản DOCTOR của ELIZA/);
assert.doesNotMatch(elizaFeedback, /chị tôi là tàu ngầm/);
var shannonGame = new FakeNode('div');
vietnamese.widgets['shannon-game'](shannonGame);
Array.from('TRỜI TỐI VÀ MƯA RẤT TO').forEach(function (character) {
  var keyLabel = character === ' ' ? '␣' : character;
  var key = shannonGame.querySelectorAll('button').find(function (button) {
    return button.children[0] && button.children[0].textContent === keyLabel;
  });
  assert.ok(key, 'Vietnamese Shannon game is missing the key ' + keyLabel);
  key._listeners.click();
});
assert.ok(shannonGame.querySelectorAll('.feedback').some(function (node) {
  return node.innerHTML.indexOf('Xong.') !== -1;
}), 'Vietnamese Shannon game should be completable');
vietnameseContext.Math = Object.create(Math);
vietnameseContext.Math.random = function () { return 14.5 / 16; };
var splitterGame = new FakeNode('div');
vietnamese.widgets['question-splitter'](splitterGame);
var televisionGuess = splitterGame.querySelectorAll('button').find(function (button) {
  return button.children[0] && button.children[0].textContent === 'Đó có phải ti-vi?';
});
assert.ok(televisionGuess, 'television guess should be available at the start');
televisionGuess._listeners.click();
assert.ok(splitterGame.querySelectorAll('.feedback').some(function (node) {
  return node.innerHTML.indexOf('Chỉ còn một đáp án') !== -1;
}), 'a correct direct guess should finish the question-splitter game');
assert.doesNotMatch(mountedText.join(' '), /The difficulty ladder|Reveal source|Score my round|Start a fresh conversation|Generate 5 times|Ask a question|Your lab log|Run the test|Play Betty|Compress the story/,
  'a Vietnamese widget retained an English interface sentinel');

var vietnameseLessonText = vietnamese.weeks.map(function (week) {
  return [week.title, week.tagline, week.checkpointStatement]
    .concat(week.beats.map(function (beat) { return (beat.title || '') + ' ' + (beat.html || ''); }))
    .join(' ');
}).join(' ');
var awkwardVietnamese = /Nêu tỷ lệ khoảng chứa đáp án|Cho một lý do để mở rộng khoảng|Giữ kết quả cho Tuần 9|bộ dự đoán văn bản|tuyến ứng dụng|phòng khám|màn bật mí|đầu ra đa dạng|điểm số đã được soạn sẵn|quan hệ dùng lại được|giả định không nên bê nguyên sang/;
assert.doesNotMatch(vietnameseLessonText + ' ' + mountedText.join(' '), awkwardVietnamese,
  'a known translation-like Vietnamese phrase returned');

console.log('bilingual localization smoke: PASS (12 weeks, 12 practical examples, 4 arcs, 23 widgets)');
