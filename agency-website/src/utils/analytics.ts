/**
 * Analytics tracking utilities for GA4 (Google Analytics)
 */

interface TrackEventParams {
  page_path?: string;
  page_title?: string;
  service_name?: string;
  cta_location?: string;
  cta_text?: string;
  link_url?: string;
  form_name?: string;
  [key: string]: any;
}

export function trackEvent(eventName: string, params: TrackEventParams = {}) {
  if (typeof window === "undefined") return;

  // Safely grab current page metadata if not supplied
  const finalParams = {
    page_path: params.page_path || window.location.pathname,
    page_title: params.page_title || document.title,
    ...params,
  };

  // Only dispatch if gtag is loaded on the window
  const w = window as any;
  if (typeof w.gtag === "function") {
    try {
      w.gtag("event", eventName, finalParams);
    } catch (e) {
      console.warn("Analytics: Failed to send event to gtag", e);
    }
  } else {
    // Fail silently so interaction remains fully functional
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Simulation] Event: "${eventName}"`, finalParams);
    }
  }
}
