// Loaded only by qa-preview.mjs, never by production HTML.
const panel = document.createElement('aside');
panel.id = 'qa-audit';
panel.setAttribute('aria-label', 'Local development audit');
panel.lang = 'en';
panel.style.cssText =
  'padding:24px;background:#fff;color:#102b4e;border:2px solid #102b4e;overflow-wrap:anywhere';
const heading = document.createElement('h2');
heading.textContent = 'Local QA — form delivery is simulated';
const button = document.createElement('button');
button.textContent = 'Run accessibility audit';
button.type = 'button';
const report = document.createElement('pre');
report.id = 'qa-report';
report.style.cssText = 'white-space:pre-wrap;font-size:14px;line-height:1.5';
panel.append(heading, button, report);
document.body.append(panel);
const eventReport = document.createElement('pre');
eventReport.id = 'qa-events';
eventReport.style.cssText = report.style.cssText;
const observedEvents = [];
eventReport.textContent = '[]';
panel.append(eventReport);
document.addEventListener('defibrillators:measurement', (event) => {
  observedEvents.push(event.detail);
  if (observedEvents.length > 25) observedEvents.shift();
  eventReport.textContent = JSON.stringify(observedEvents);
});
// Local QA must not open a mail client or place a call during click checks.
document.addEventListener('click', (event) => {
  if (event.target.closest?.('a[href^="tel:"], a[href^="mailto:"]'))
    event.preventDefault();
});
async function audit() {
  report.dataset.state = 'running';
  button.disabled = true;
  try {
    await document.fonts.ready;
    const result = await window.axe.run(
      { exclude: [['#qa-audit']] },
      {
        runOnly: {
          type: 'tag',
          values: [
            'wcag2a',
            'wcag2aa',
            'wcag21a',
            'wcag21aa',
            'wcag22aa',
            'best-practice',
          ],
        },
      },
    );
    const compact = (rules) =>
      rules.map((rule) => ({
        id: rule.id,
        impact: rule.impact,
        nodes: rule.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      }));
    report.textContent = JSON.stringify({
      path: location.pathname,
      width: innerWidth,
      axe: window.axe.version,
      violations: compact(result.violations),
      incomplete: compact(result.incomplete),
      passes: result.passes.length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...document.images]
        .filter((img) => img.complete && !img.naturalWidth)
        .map((img) => img.getAttribute('src')),
    });
    report.dataset.state = 'complete';
  } catch (error) {
    report.textContent = String(error);
    report.dataset.state = 'error';
  }
  button.disabled = false;
}
button.addEventListener('click', audit);
window.addEventListener('load', audit, { once: true });

const resetAnalytics = document.createElement('button');
resetAnalytics.type = 'button';
resetAnalytics.textContent = 'Reset analytics choice (local QA)';
resetAnalytics.addEventListener('click', () => {
  localStorage.removeItem('dfca-analytics-v1');
  location.reload();
});
panel.append(resetAnalytics);
