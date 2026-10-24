type AnalyticsProps = Record<string, string | number | boolean>;

interface Window {
  plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
  op?: (method: 'track', event: string, props?: AnalyticsProps) => void;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
