(() => {
  // Local-only Google tag simulator. Does not contact Google or create cookies.
  const report = document.createElement('pre');
  report.id = 'qa-ga-report';
  report.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere';
  const attach = () =>
    (document.querySelector('#qa-audit') ?? document.body).append(report);
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', attach);
  else attach();
  const commands = [];
  const queue = window.dataLayer;
  const record = (args) => {
    const command = Array.from(args);
    if (!window['ga-disable-G-ERD2WFW0WZ']) commands.push(command);
    report.textContent = JSON.stringify(commands);
  };
  queue.forEach(record);
  queue.push = (...items) => {
    items.forEach(record);
    return commands.length;
  };
})();
