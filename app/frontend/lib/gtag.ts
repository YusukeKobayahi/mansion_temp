import { GoogleAnalyticsEvent } from "./types";
// UA
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
// GA4
export const GA4_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_TRACKING_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID) return;

  window.gtag("config", GA_TRACKING_ID, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value = 1,
}: GoogleAnalyticsEvent): void => {
  if (!GA_TRACKING_ID) return;

  window.gtag("event", action, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    event_category: category,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    event_label: label,
    value: value,
  });
};
