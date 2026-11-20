/**
 * Google Analytics 4 (GA4) Integration for Bharath Enterprises
 * 
 * Supports:
 * - Dynamic gtag.js initialization with measurement ID from VITE_GA_MEASUREMENT_ID
 * - SPA Route Change Pageview tracking with document.title
 * - High-value conversion event tracking:
 *   - Form submissions / Leads (Enquiry Modal)
 *   - WhatsApp clicks (Float & inline buttons)
 *   - Brochure views & downloads
 *   - Direct contact clicks (phone, email)
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics 4
 * Injects gtag.js script and sets up window.dataLayer / window.gtag
 */
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Don't initialize if already loaded
  if (document.getElementById('google-analytics-gtag')) return;

  // Measurement ID must be a valid GA4 ID (starts with G-)
  const measurementId = GA_MEASUREMENT_ID.trim();
  if (!measurementId || !measurementId.startsWith('G-')) {
    // Analytics is disabled or pending configuration
    console.info('[Analytics] Notice: VITE_GA_MEASUREMENT_ID not configured or pending. Tracking dormant.');
    return;
  }

  try {
    // 1. Create script tag
    const script = document.createElement('script');
    script.id = 'google-analytics-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    // 2. Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());

    // 3. Configure GA4 with SPA-friendly settings
    gtag('config', measurementId, {
      send_page_view: false, // We manually dispatch page_view on route change
      cookie_flags: 'SameSite=None;Secure',
    });

    console.info('[Analytics] Google Analytics 4 initialized successfully with ID:', measurementId);
  } catch (err) {
    console.warn('[Analytics] Failed to initialize Google Analytics:', err);
  }
};

/**
 * Track a Page View on Route Change
 * @param {string} path - URL path (e.g. '/projects', '/team')
 * @param {string} title - Page Title (from document.title)
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const measurementId = (GA_MEASUREMENT_ID || '').trim();
    if (!measurementId) return;

    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: path || window.location.pathname + window.location.search,
      send_to: measurementId,
    });
  }
};

/**
 * Generic Event Tracker
 * @param {string} eventName - GA4 event name (e.g. 'generate_lead', 'click', 'view_item')
 * @param {object} params - Parameters object
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track Lead / Commercial Enquiry Submission
 */
export const trackEnquirySubmit = ({ enquiryId, mode, productOrService, companyName }) => {
  trackEvent('generate_lead', {
    event_category: 'engagement',
    event_label: productOrService || 'General Commercial Enquiry',
    enquiry_id: enquiryId,
    mode: mode,
    company_name: companyName,
  });
};

/**
 * Track WhatsApp Chat Initiation
 */
export const trackWhatsAppClick = ({ source = 'floating_button', prefillMessage = '' }) => {
  trackEvent('contact', {
    method: 'whatsapp',
    event_category: 'contact',
    event_label: source,
    prefill_message: prefillMessage ? prefillMessage.substring(0, 100) : '',
  });
};

/**
 * Track Brochure Open / View in Modal
 */
export const trackBrochureView = ({ projectId, title, totalPages = 1 }) => {
  trackEvent('view_item', {
    item_id: projectId,
    item_name: title,
    item_category: 'Project Brochure',
    total_pages: totalPages,
  });
};

/**
 * Track Brochure Download / Save
 */
export const trackBrochureDownload = ({ projectId, title, pageNumber = 1 }) => {
  trackEvent('file_download', {
    item_id: projectId,
    item_name: title,
    file_name: `${title}-Page-${pageNumber}`,
    file_extension: 'webp',
  });
};

/**
 * Track Direct Phone Call or Email click
 */
export const trackContactClick = (method = 'phone') => {
  trackEvent('contact', {
    method,
    event_category: 'contact',
  });
};
