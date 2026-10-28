/* Add one practical example before each week's checkpoint. */
GM.addApplications = function (applications) {
  applications.forEach(function (application) {
    var week = GM.weeks.find(function (item) { return item.num === application.num; });
    if (!week || week.beats.some(function (beat) { return beat.kind === 'application'; })) return;
    if (application.checkpointStatement) week.checkpointStatement = application.checkpointStatement;
    var checkpoint = week.beats.findIndex(function (beat) { return beat.kind === 'checkpoint'; });
    var beat = {
      kind: 'application',
      title: application.title,
      html: application.html,
      widget: 'application-notebook',
      widgetOpts: { id: application.id || 'week-' + application.num, fields: application.fields },
    };
    week.beats.splice(checkpoint < 0 ? week.beats.length : checkpoint, 0, beat);
  });
};
