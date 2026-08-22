/* Global namespace + tiny DOM helpers shared by all views and widgets.
   Classic scripts (no modules) so the app works when opened via file://. */
window.GM = {
  weeks: [],        // populated by js/data/arc*-weeks.js
  arcs: [],         // arc metadata, populated by data files
  widgets: {},      // name -> mount(container, opts), populated by js/widgets/*
  views: {},        // route views, populated by js/views/*
  jargon: [],       // two-column dictionary entries
};

/* Language choice is separate from learner progress so switching languages never
   resets checkpoints or saved work. Keep this tiny and synchronous for file://. */
GM.language = (function () {
  var key = 'guessing-machines-language-v1';
  var current = 'en';
  try { current = localStorage.getItem(key) === 'vi' ? 'vi' : 'en'; } catch (e) { /* use English */ }
  return {
    get: function () { return current; },
    isVietnamese: function () { return current === 'vi'; },
    set: function (language) {
      current = language === 'vi' ? 'vi' : 'en';
      try { localStorage.setItem(key, current); } catch (e) { /* keep in-memory choice */ }
      location.reload();
    },
  };
})();

/* Compact bilingual helper used by the shell and interactive widgets. */
GM.t = function (english, vietnamese) {
  return GM.language.isVietnamese() ? vietnamese : english;
};

/* el('div', {class:'card', onclick:fn}, [children|string]) -> HTMLElement */
GM.el = function (tag, attrs, children) {
  var node = document.createElement(tag);
  attrs = attrs || {};
  Object.keys(attrs).forEach(function (k) {
    var v = attrs[k];
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (v !== null && v !== undefined && v !== false) node.setAttribute(k, v);
  });
  (children || []).forEach(function (c) {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
};

/* Widget shell: titled teal box every interactive lives in. */
GM.widgetShell = function (title, subtitle) {
  var body = GM.el('div', { class: 'gm-widget-body' });
  var shell = GM.el('div', { class: 'gm-widget' }, [
    GM.el('p', { class: 'gm-widget-title' }, ['🕹️ ' + title]),
    subtitle ? GM.el('p', { class: 'gm-widget-sub' }, [subtitle]) : null,
    body,
  ]);
  return { shell: shell, body: body };
};

/* Distribution bar row: word + proportional bar + percent label. */
GM.distRow = function (word, pct, accent) {
  return GM.el('div', { class: 'dist-row' }, [
    GM.el('span', { class: 'dist-word' }, [word]),
    GM.el('div', { class: 'dist-track' }, [
      GM.el('div', { class: 'dist-fill' + (accent ? ' accent' : ''), style: { width: Math.max(1, Math.round(pct * 100)) + '%' } }),
    ]),
    GM.el('span', { class: 'dist-pct' }, [(pct * 100).toFixed(pct < 0.1 ? 1 : 0) + '%']),
  ]);
};

GM.feedback = function (kind, html) {
  return GM.el('div', { class: 'feedback ' + kind, html: html });
};

/* Softmax with temperature over "scores" (logits). T=0 -> argmax one-hot. */
GM.softmaxT = function (scores, temp) {
  if (temp <= 0.001) {
    var best = scores.indexOf(Math.max.apply(null, scores));
    return scores.map(function (_, i) { return i === best ? 1 : 0; });
  }
  var scaled = scores.map(function (s) { return s / temp; });
  var m = Math.max.apply(null, scaled);
  var exps = scaled.map(function (s) { return Math.exp(s - m); });
  var sum = exps.reduce(function (a, b) { return a + b; }, 0);
  return exps.map(function (e) { return e / sum; });
};

/* Sample an index from a probability vector. */
GM.sample = function (probs) {
  var r = Math.random(), acc = 0;
  for (var i = 0; i < probs.length; i++) { acc += probs[i]; if (r < acc) return i; }
  return probs.length - 1;
};

GM.wordCount = function (text) {
  var t = (text || '').trim();
  return t ? t.split(/\s+/).length : 0;
};

GM.escapeHtml = function (s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
};
