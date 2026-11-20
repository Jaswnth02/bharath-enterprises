/**
 * Analytics Integration for Bharath Enterprises
 *
 * Uses Google Tag Manager (GTM-WNCXFVC7) which is loaded via index.html.
 * GTM manages GA4 and all other tags from the GTM dashboard.
 *
 * All events are pushed to window.dataLayer — GTM forwards them to GA4.
 *
 * Tracks:
 *  - SPA pageviews on route change
 *  - Enquiry form submissions (generate_lead)
 *  - WhatsApp button clicks (contact)
 *  - Project brochure views (view_item)
 *  - Brochure page downloads (file_download)
 *  - Phone / email contact link clicks (contact)
 */

const GTM_ID = 'GTM-WNCXFVC7';

/**
 * Push an object to the GTM dataLayer.
 * GTM picks it up and fires matching triggers in GA4 (or any other tag).
 */
const pushDataLayer = (payload) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

/**
 * Ensure gtag helper is available for direct GA4 calls via GTM.
 * GTM injects its own gtag once the container loads; this is a safe no-op
 * stub so our helpers never throw before GTM is ready.
 */
const safeGtag = (...args) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    // Queue via dataLayer until GTM/GA4 sets up window.gtag
    pushDataLayer(args);
  }
};

// ─── No longer needed: GTM loads gtag.js via its own tag ────────────────────
// initGA() is a no-op kept for backward compatibility — GTM handles everything.
export const initGA = () => {
  // GTM-WNCXFVC7 is already injected in index.html.
  // GA4 config & script loading are managed inside GTM container.
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  }
};

/**
 * Track a page view on SPA route change.
 * Pushes a 'page_view' event to dataLayer so GTM/GA4 records each navigation.
 *
 * @param {string} path  - e.g. '/projects' or '/team'
 * @param {string} title - Page title (from document.title after useSEO updates it)
 */
export const trackPageView = (path, title) => {
  pushDataLayer({
    event: 'page_view',
    page_title: title || document.title,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: path || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''),
  });
};

/**
 * Generic event push to dataLayer.
 * @param {string} eventName - GA4-compatible event name
 * @param {object} params    - Additional event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  pushDataLayer({
    event: eventName,
    ...params,
  });
};

/**
 * Track Commercial Enquiry Form Submission (Lead)
 */
export const trackEnquirySubmit = ({ enquiryId, mode, productOrService, companyName }) => {
  trackEvent('generate_lead', {
    event_category: 'engagement',
    event_label: productOrService || 'General Commercial Enquiry',
    enquiry_id: enquiryId,
    form_mode: mode,
    company_name: companyName,
  });
};

/**
 * Track WhatsApp Chat Button Click
 */
export const trackWhatsAppClick = ({ source = 'floating_button', prefillMessage = '' }) => {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: source,
    contact_method: 'whatsapp',
    prefill_message: prefillMessage ? prefillMessage.substring(0, 100) : '',
  });
};

/**
 * Track Project Brochure Open / View in Modal
 */
export const trackBrochureView = ({ projectId, title, totalPages = 1 }) => {
  trackEvent('brochure_view', {
    event_category: 'engagement',
    item_id: projectId,
    item_name: title,
    item_category: 'Project Brochure',
    total_pages: totalPages,
  });
};

/**
 * Track Brochure Page Download / Save
 */
export const trackBrochureDownload = ({ projectId, title, pageNumber = 1 }) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    item_id: projectId,
    item_name: title,
    file_name: `${title}-Page-${pageNumber}`,
    file_extension: 'webp',
  });
};

/**
 * Track Phone or Email Contact Link Click
 */
export const trackContactClick = (method = 'phone') => {
  trackEvent('contact_click', {
    event_category: 'contact',
    contact_method: method,
  });
};

export { GTM_ID };
