import { consentKey, consentLifetime } from '../data/analytics';
import { analyticsEvent, readAnalyticsChoice } from '../lib/analytics';
import { measurementChannel } from '../lib/measurement';

const panel = document.querySelector<HTMLElement>('[data-analytics-consent]')!;
const id = panel.dataset.measurementId!;
const scope = window as unknown as Record<string, unknown>;
const preferences = [
  ...document.querySelectorAll<HTMLButtonElement>(
    '[data-analytics-preferences]',
  ),
];
let allowed = false;
let loaded = false;
let returnFocus: HTMLElement | null = null;
const queue: unknown[] = [];
const command: (...args: unknown[]) => void = function () {
  // Preserve the Google tag's documented command-arguments queue format.
  // eslint-disable-next-line prefer-rest-params
  queue.push(arguments);
};
const canonical = document.querySelector<HTMLLinkElement>(
  'link[rel=canonical]',
)!.href;
const expiry = () => {
  // Delete only this integration's first-party cookies, across its host scopes.
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (!/^dfca_ga(?:_|$)/.test(name)) continue;
    for (const domain of ['', location.hostname, '.' + location.hostname])
      document.cookie = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax${domain ? '; Domain=' + domain : ''}`;
  }
};
const activate = () => {
  scope['ga-disable-' + id] = false;
  if (!loaded) {
    loaded = true;
    scope.dataLayer = queue;
    scope.gtag = command;
    command('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    command('set', {
      page_location: canonical,
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    command('js', new Date());
    command('consent', 'update', { analytics_storage: 'granted' });
    command('config', id, {
      send_page_view: false,
      cookie_prefix: 'dfca',
      cookie_expires: consentLifetime / 1000,
      cookie_update: false,
      page_location: canonical,
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.ga4Loader = '';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  command('event', 'page_view', {
    page_location: canonical,
    page_referrer: '',
    page_title: document.title,
  });
};
const apply = (choice: boolean) => {
  const previous = allowed;
  allowed = choice;
  scope['ga-disable-' + id] = !choice;
  if (choice && !previous) activate();
  if (!choice) {
    queue.length = 0;
    expiry();
  }
};
const save = (choice: boolean) => {
  try {
    localStorage.setItem(
      consentKey,
      JSON.stringify({ allowed: choice, at: Date.now() }),
    );
  } catch {
    /* Choice still applies to this page. */
  }
  apply(choice);
  panel.hidden = true;
  returnFocus?.focus();
};
for (const button of preferences) {
  button.hidden = false;
  button.addEventListener('click', () => {
    returnFocus = button;
    panel.hidden = false;
    panel.querySelector<HTMLElement>('h2')!.focus();
  });
}
panel
  .querySelector('[data-analytics-allow]')!
  .addEventListener('click', () => save(true));
panel
  .querySelector('[data-analytics-deny]')!
  .addEventListener('click', () => save(false));
document.addEventListener(measurementChannel, (event) => {
  if (!allowed || !(event instanceof CustomEvent)) return;
  const clean = analyticsEvent(event.detail);
  if (clean) command('event', clean.name, clean.params);
});
window.addEventListener('storage', (event) => {
  if (event.key !== consentKey && event.key !== null) return;
  const choice = readAnalyticsChoice(event.newValue);
  apply(choice === true);
  panel.hidden = choice !== null;
});
let choice: boolean | null = null;
try {
  choice = readAnalyticsChoice(localStorage.getItem(consentKey));
} catch {
  /* Default remains denied. */
}
apply(choice === true);
panel.hidden = choice !== null;
