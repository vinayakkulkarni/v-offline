// GA4 measurement ID for v-offline.vinayakkulkarni.dev.
// Empty until the property exists; GA4 stays off while it is empty.
const GA_MEASUREMENT_ID = '';

type EventProps = Record<string, string | number | boolean>;

export function initGoogleAnalytics(): void {
  if (!GA_MEASUREMENT_ID) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(script);
  // window.gtag is the stub from index.html; it queues `arguments` as gtag.js expects.
  window.gtag?.('js', new Date());
  window.gtag?.('config', GA_MEASUREMENT_ID);
}

export function track(event: string, props: EventProps = {}): void {
  window.plausible?.(event, { props });
  window.op?.('track', event, props);
  if (GA_MEASUREMENT_ID) window.gtag?.('event', event, props);
}
