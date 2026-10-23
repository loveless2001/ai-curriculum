/* Reusable notes for each week's practical example. */
GM.widgets['application-notebook'] = function (container, opts) {
  var key = 'application-week-' + opts.id;
  var saved = GM.store.getSaved(key, {});
  var shell = GM.widgetShell(
    GM.t('Your notes', 'Ghi chú của bạn'),
    GM.t(
      'Work through the example, then try the same idea on one of your tasks.',
      'Thử với ví dụ trên, rồi dùng cách này cho một việc của bạn.'
    )
  );
  var status = GM.el('p', { class: 'note application-save-status' }, [
    GM.t('Saved on this device as you type.', 'Ghi chú được tự động lưu trên thiết bị này.'),
  ]);

  (opts.fields || []).forEach(function (field, index) {
    var id = 'application-' + opts.id + '-' + index;
    var textarea = GM.el('textarea', {
      id: id,
      rows: field.rows || 3,
      placeholder: field.placeholder || '',
    });
    textarea.value = saved[index] || '';
    textarea.addEventListener('input', function () {
      saved[index] = textarea.value;
      GM.store.setSaved(key, saved);
      status.textContent = GM.t('Saved.', 'Đã lưu.');
    });
    shell.body.appendChild(GM.el('div', { class: 'application-note-field' }, [
      GM.el('label', { for: id }, [field.label]),
      textarea,
    ]));
  });

  shell.body.appendChild(status);
  container.appendChild(shell.shell);
};
