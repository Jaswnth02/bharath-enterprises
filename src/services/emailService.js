/**
 * Bharath Enterprises - Dual Email Dispatch Service
 * Handles:
 * 1. Admin Lead Alert -> Sent to the business domain email (contact@bharatok.com)
 * 2. Customer Auto-Reply -> Sent to the submitter's email acknowledging receipt
 *
 * Transports supported:
 * - Firebase Firestore 'mail' collection (Firebase Trigger Email extension with SMTP)
 * - EmailJS REST API (Direct browser-to-inbox via custom domain SMTP, zero backend needed)
 * - Custom Webhook endpoint (if VITE_EMAIL_WEBHOOK_URL is set)
 */

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Primary destination email where new form leads are received
export const OWNER_NOTIFICATION_EMAIL = 
  import.meta.env.VITE_OWNER_EMAIL || 'cncmurthi37@gmail.com';

// Primary company domain email used for sending and auto-replies
export const COMPANY_DOMAIN_EMAIL = 
  import.meta.env.VITE_COMPANY_EMAIL || 'contact@bharatok.com';

export const COMPANY_PHONE = 
  import.meta.env.VITE_COMPANY_PHONE || '+91 96009 49927';

export const COMPANY_NAME = 'Bharath Enterprises';

/**
 * Builds HTML template for Admin Notification
 */
export const buildAdminNotificationHtml = (enquiry) => {
  const fields = [
    { label: 'Reference ID', value: enquiry.enquiryId || enquiry.id || 'N/A' },
    { label: 'Full Name', value: enquiry.customerName || 'N/A' },
    { label: 'Email', value: enquiry.email ? `<a href="mailto:${enquiry.email}" style="color:#C5A880;text-decoration:none;font-weight:600;">${enquiry.email}</a>` : 'N/A' },
    { label: 'Phone / WhatsApp', value: enquiry.phone ? `<a href="tel:${enquiry.phone}" style="color:#0A192F;text-decoration:none;font-weight:600;">${enquiry.phone}</a>` : 'N/A' },
    { label: 'Company Name', value: enquiry.companyName || 'Not specified' },
    { label: 'Enquiry Type', value: enquiry.enquiryType || 'General Business' },
    enquiry.interestCategory ? { label: 'Interest Category', value: enquiry.interestCategory } : null,
    enquiry.productOrService ? { label: 'Product / Service', value: enquiry.productOrService } : null,
    enquiry.targetTimeline ? { label: 'Target Timeline', value: enquiry.targetTimeline } : null,
    enquiry.designation ? { label: 'Designation / Role', value: enquiry.designation } : null,
    enquiry.facilityLocation ? { label: 'Facility Location', value: enquiry.facilityLocation } : null,
    enquiry.consultationType ? { label: 'Consultation Domain', value: enquiry.consultationType } : null,
    enquiry.urgencyLevel ? { label: 'Urgency Level', value: enquiry.urgencyLevel } : null,
    enquiry.partnershipType ? { label: 'Partnership Structure', value: enquiry.partnershipType } : null,
    enquiry.investmentScope ? { label: 'Investment / Capital Scope', value: enquiry.investmentScope } : null,
    enquiry.operationalTerritory ? { label: 'Target Operational Territory', value: enquiry.operationalTerritory } : null,
    enquiry.procurementCategory ? { label: 'Procurement Category', value: enquiry.procurementCategory } : null,
    enquiry.estimatedQuantity ? { label: 'Estimated Volume / Quantity', value: enquiry.estimatedQuantity } : null,
    enquiry.deliveryPort ? { label: 'Target Port of Delivery', value: enquiry.deliveryPort } : null,
  ].filter(Boolean);

  const mainNotes = 
    enquiry.message || 
    enquiry.specifications || 
    enquiry.strategicIntent || 
    enquiry.currentChallenges || 
    'No additional message provided.';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>New Business Lead - ${enquiry.customerName}</title>
</head>
<body style="margin:0;padding:24px;background-color:#F4F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1F2937;">
  <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid #E5E7EB;">
    <!-- Brand Header -->
    <div style="background:#0A192F;padding:28px 32px;color:#FFFFFF;">
      <p style="margin:0;font-size:11px;font-weight:700;color:#C5A880;letter-spacing:2px;text-transform:uppercase;">
        BHARATH ENTERPRISES • DIRECT TRADE DESK
      </p>
      <h1 style="margin:6px 0 0;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">
        New Lead Submission
      </h1>
      <p style="margin:4px 0 0;font-size:13px;color:#94A3B8;">
        Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </p>
    </div>

    <!-- Reference Pill -->
    <div style="padding:20px 32px 0;">
      <div style="background:#F8FAFC;border:1px solid #E2E8F0;padding:12px 18px;border-radius:10px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:12px;color:#64748B;font-weight:600;">Reference Ticket</span>
        <span style="font-size:14px;color:#0A192F;font-weight:800;font-family:monospace;letter-spacing:1px;">
          ${enquiry.enquiryId || enquiry.id}
        </span>
      </div>
    </div>

    <!-- Lead Details Table -->
    <div style="padding:24px 32px;">
      <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;color:#0A192F;letter-spacing:1px;">
        Contact & Requirement Overview
      </h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tbody>
          ${fields.map((f, i) => `
            <tr style="background:${i % 2 === 0 ? '#FFFFFF' : '#FAFAFB'};">
              <td style="padding:10px 14px;font-weight:600;color:#4B5563;width:38%;border-bottom:1px solid #F3F4F6;">${f.label}</td>
              <td style="padding:10px 14px;color:#111827;border-bottom:1px solid #F3F4F6;">${f.value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Client Message / Scope -->
      <div style="margin-top:24px;">
        <h4 style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;color:#4B5563;letter-spacing:0.8px;">
          Requirement Details / Message
        </h4>
        <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-left:4px solid #C5A880;padding:16px;border-radius:8px;font-size:13.5px;line-height:1.6;color:#1F2937;white-space:pre-wrap;">
${mainNotes}
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #E5E7EB;display:flex;gap:12px;">
        <a href="mailto:${enquiry.email}?subject=Re: Your enquiry with Bharath Enterprises [${enquiry.enquiryId || enquiry.id}]" 
           style="display:inline-block;background:#0A192F;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:12px;padding:12px 22px;border-radius:8px;">
          Reply to Customer Directly
        </a>
        ${enquiry.phone ? `
        <a href="https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}" 
           style="display:inline-block;background:#25D366;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:12px;padding:12px 22px;border-radius:8px;margin-left:8px;">
          Open on WhatsApp
        </a>` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#F9FAFB;padding:16px 32px;border-top:1px solid #E5E7EB;font-size:11px;color:#6B7280;text-align:center;">
      This notification was automatically dispatched from the official Bharath Enterprises commercial web portal.
    </div>
  </div>
</body>
</html>
`;
};

/**
 * Builds HTML template for Customer Auto-Reply
 */
export const buildCustomerAutoReplyHtml = (enquiry) => {
  const ref = enquiry.enquiryId || enquiry.id || 'N/A';
  const name = enquiry.customerName || 'Valued Client';
  const category = enquiry.enquiryType || 'Industrial & Trade Services';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Thank You for Contacting Bharath Enterprises [${ref}]</title>
</head>
<body style="margin:0;padding:24px;background-color:#F5F3EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1F2937;">
  <div style="max-width:620px;margin:0 auto;background:#FFFFFF;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px rgba(10,25,47,0.08);border:1px solid #E5E2DC;">
    
    <!-- Executive Brand Header -->
    <div style="background:#0A192F;padding:34px 36px;color:#FFFFFF;text-align:left;position:relative;">
      <p style="margin:0;font-size:11px;font-weight:800;color:#C5A880;letter-spacing:2.5px;text-transform:uppercase;">
        BHARATH ENTERPRISES
      </p>
      <h1 style="margin:6px 0 4px;font-size:24px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">
        Enquiry Confirmation
      </h1>
      <p style="margin:0;font-size:12.5px;color:#94A3B8;">
        Industrial Boilers • Spares & Revamps • Project DPR • Global Trade Facilitation
      </p>
    </div>

    <!-- Warm Greeting & Confirmation -->
    <div style="padding:32px 36px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#111827;">
        Dear <strong>${name}</strong>,
      </p>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.65;color:#374151;">
        Thank you for reaching out to <strong>Bharath Enterprises</strong>. We have successfully received your commercial enquiry regarding <strong>${category}</strong>. Our technical trade and procurement desk is already reviewing your details.
      </p>

      <!-- Reference Details Card -->
      <div style="background:#FAF8F5;border:1px solid #E7E3DC;border-radius:12px;padding:18px 22px;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr>
            <td style="padding:6px 0;color:#6B7280;font-weight:600;width:40%;">Reference Number:</td>
            <td style="padding:6px 0;color:#0A192F;font-weight:800;font-family:monospace;letter-spacing:1px;">#${ref}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6B7280;font-weight:600;">Enquiry Type:</td>
            <td style="padding:6px 0;color:#111827;font-weight:600;">${category}</td>
          </tr>
          ${enquiry.companyName ? `
          <tr>
            <td style="padding:6px 0;color:#6B7280;font-weight:600;">Company / Entity:</td>
            <td style="padding:6px 0;color:#111827;">${enquiry.companyName}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:6px 0;color:#6B7280;font-weight:600;">Status:</td>
            <td style="padding:6px 0;color:#059669;font-weight:700;">Received & Queued for Review</td>
          </tr>
        </table>
      </div>

      <!-- What to Expect Next -->
      <h3 style="margin:26px 0 14px;font-size:13.5px;font-weight:800;color:#0A192F;text-transform:uppercase;letter-spacing:1px;">
        Next Steps & Timelines
      </h3>
      <ol style="margin:0;padding-left:20px;font-size:13px;line-height:1.8;color:#4B5563;">
        <li><strong style="color:#111827;">Desk Review:</strong> Our domain engineering or trade specialist reviews your technical parameters.</li>
        <li><strong style="color:#111827;">Commercial Response:</strong> A formal reply or quotation will be dispatched to your email within <strong style="color:#0A192F;">24 business hours</strong>.</li>
        <li><strong style="color:#111827;">Direct Coordination:</strong> For urgent requirements or timeline-critical plant emergencies, you can contact our live desk directly.</li>
      </ol>

      <!-- Direct Support Contact Card -->
      <div style="margin-top:28px;background:#0A192F;color:#FFFFFF;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#C5A880;letter-spacing:1.5px;text-transform:uppercase;">
          Direct Contact Desk
        </p>
        <p style="margin:4px 0;font-size:13px;color:#E2E8F0;">
          <strong>Email:</strong> <a href="mailto:${COMPANY_DOMAIN_EMAIL}" style="color:#FFFFFF;text-decoration:underline;">${COMPANY_DOMAIN_EMAIL}</a>
        </p>
        <p style="margin:4px 0;font-size:13px;color:#E2E8F0;">
          <strong>Phone / WhatsApp:</strong> <a href="tel:${COMPANY_PHONE}" style="color:#FFFFFF;text-decoration:none;">${COMPANY_PHONE}</a>
        </p>
        <p style="margin:4px 0;font-size:12px;color:#94A3B8;">
          <strong>Offices:</strong> Coimbatore & Coonoor, Tamil Nadu, India
        </p>
      </div>

      <!-- Closing -->
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #E5E7EB;">
        <p style="margin:0;font-size:13px;color:#6B7280;line-height:1.6;">
          Warm regards,<br />
          <strong style="color:#0A192F;">Commercial Trade & Operations Team</strong><br />
          Bharath Enterprises
        </p>
      </div>
    </div>

    <!-- Legal Footer -->
    <div style="background:#FAF8F5;padding:16px 36px;border-top:1px solid #E7E3DC;font-size:11px;color:#9CA3AF;text-align:center;">
      This is an automated acknowledgment confirming receipt of your enquiry at <a href="https://bharatok.com" style="color:#9CA3AF;text-decoration:none;">bharatok.com</a>. Please do not reply directly to this auto-confirmation email if different from our official desk email.
    </div>
  </div>
</body>
</html>
`;
};

/**
 * Builds plain-text version for Admin Lead Alert
 */
export const buildAdminNotificationText = (enquiry) => {
  return `[NEW LEAD - BHARATH ENTERPRISES]
Reference: ${enquiry.enquiryId || enquiry.id}
Time: ${new Date().toISOString()}

Customer Details:
- Name: ${enquiry.customerName}
- Email: ${enquiry.email}
- Phone: ${enquiry.phone}
- Company: ${enquiry.companyName || 'Not specified'}
- Enquiry Type: ${enquiry.enquiryType || 'General Business'}

Details / Message:
${enquiry.message || enquiry.specifications || enquiry.strategicIntent || enquiry.currentChallenges || 'No additional message'}

Respond directly via email: ${enquiry.email}`;
};

/**
 * Builds plain-text version for Customer Auto-Reply
 */
export const buildCustomerAutoReplyText = (enquiry) => {
  return `Dear ${enquiry.customerName || 'Valued Client'},

Thank you for contacting Bharath Enterprises. We have successfully received your enquiry regarding "${enquiry.enquiryType || 'Industrial & Trade Services'}".

Enquiry Reference: #${enquiry.enquiryId || enquiry.id}
Status: Received and under review

Our technical and commercial trade desk is evaluating your requirements and will respond within 24 business hours.

For immediate support, you can connect directly with our desk:
- Email: ${COMPANY_DOMAIN_EMAIL}
- Phone / WhatsApp: ${COMPANY_PHONE}
- Location: Coimbatore & Coonoor, Tamil Nadu, India

Warm regards,
Commercial Trade & Operations Team
Bharath Enterprises`;
};

/**
 * Dispatches both the Admin Lead Alert and the Customer Auto-Reply
 * 1. Writes to Firestore 'mail' collection (Firebase Trigger Email extension with SMTP)
 * 2. Attempts EmailJS REST API dispatch if keys are configured
 * 3. Attempts Custom Webhook if VITE_EMAIL_WEBHOOK_URL is set
 */
export const dispatchEnquiryEmails = async (enquiryData) => {
  const ref = enquiryData.enquiryId || enquiryData.id || `ENQ-${Date.now().toString(36).toUpperCase()}`;
  const enquiry = { ...enquiryData, enquiryId: ref, id: ref };
  const recipientEmail = (enquiry.email || '').trim();

  const adminSubject = `[New Lead - Bharath Enterprises] ${enquiry.enquiryType || 'General Business'} from ${enquiry.customerName}`;
  const customerSubject = `Thank You for Your Enquiry - Bharath Enterprises [Ref: #${ref}]`;

  const adminHtml = buildAdminNotificationHtml(enquiry);
  const adminText = buildAdminNotificationText(enquiry);

  const customerHtml = buildCustomerAutoReplyHtml(enquiry);
  const customerText = buildCustomerAutoReplyText(enquiry);

  const results = {
    firestoreAdminMail: null,
    firestoreAutoReplyMail: null,
    emailJsAdmin: null,
    emailJsAutoReply: null,
    webhook: null,
  };

  // -------------------------------------------------------------------------
  // 1. FIREBASE 'mail' COLLECTION DISPATCH
  // Standard schema for Firebase "Trigger Email from Firestore" (firestore-send-email)
  // -------------------------------------------------------------------------
  if (db) {
    try {
      // 1A. Lead Notification to cncmurthi37@gmail.com, sent using/from contact@bharatok.com
      const adminMailPromise = addDoc(collection(db, 'mail'), {
        to: [OWNER_NOTIFICATION_EMAIL],
        cc: [COMPANY_DOMAIN_EMAIL],
        from: `Bharath Enterprises Leads <${COMPANY_DOMAIN_EMAIL}>`,
        replyTo: recipientEmail || COMPANY_DOMAIN_EMAIL,
        message: {
          subject: adminSubject,
          text: adminText,
          html: adminHtml,
        },
        metadata: {
          enquiryId: ref,
          type: 'admin_lead_alert',
          customerName: enquiry.customerName,
          customerEmail: recipientEmail,
          targetInbox: OWNER_NOTIFICATION_EMAIL,
          senderDomain: COMPANY_DOMAIN_EMAIL,
          createdAt: new Date().toISOString(),
        },
      });

      // 1B. Auto-Reply to Customer Email (if customer provided an email address)
      let customerMailPromise = Promise.resolve(null);
      if (recipientEmail) {
        customerMailPromise = addDoc(collection(db, 'mail'), {
          to: [recipientEmail],
          from: `Bharath Enterprises <${COMPANY_DOMAIN_EMAIL}>`,
          replyTo: COMPANY_DOMAIN_EMAIL,
          message: {
            subject: customerSubject,
            text: customerText,
            html: customerHtml,
          },
          metadata: {
            enquiryId: ref,
            type: 'customer_auto_reply',
            customerName: enquiry.customerName,
            createdAt: new Date().toISOString(),
          },
        });
      }

      const [adminDoc, customerDoc] = await Promise.allSettled([adminMailPromise, customerMailPromise]);
      results.firestoreAdminMail = adminDoc.status === 'fulfilled' ? adminDoc.value.id : null;
      results.firestoreAutoReplyMail = customerDoc.status === 'fulfilled' && customerDoc.value ? customerDoc.value.id : null;
      
      console.info(`[EmailService] Firestore mail queued: Admin=${results.firestoreAdminMail}, AutoReply=${results.firestoreAutoReplyMail}`);
    } catch (err) {
      console.warn('[EmailService] Firestore mail queue dispatch warning:', err.message);
    }
  }

  // -------------------------------------------------------------------------
  // 2. DIRECT BACKEND SMTP DISPATCH (Direct Outlook connection via Node.js nodemailer)
  // Calls /api/send-email directly on the website backend (Zero 3rd parties, no EmailJS)
  // -------------------------------------------------------------------------
  try {
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          results.directSmtp = data;
          console.info('[EmailService] Direct SMTP email dispatched successfully:', data);
        } else {
          console.warn('[EmailService] Direct SMTP API returned error:', data);
        }
      })
      .catch((err) => {
        console.warn('[EmailService] Direct SMTP API network error:', err.message);
      });
  } catch (directErr) {
    console.warn('[EmailService] Direct dispatch trigger error:', directErr);
  }

  // -------------------------------------------------------------------------
  // 3. OPTIONAL WEBHOOK DISPATCH (Custom serverless endpoint, Nodemailer, Resend)
  // -------------------------------------------------------------------------
  const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_enquiry_emails',
          enquiry,
          adminMail: {
            to: COMPANY_DOMAIN_EMAIL,
            subject: adminSubject,
            text: adminText,
            html: adminHtml,
          },
          autoReplyMail: {
            to: recipientEmail,
            from: `Bharath Enterprises <${COMPANY_DOMAIN_EMAIL}>`,
            subject: customerSubject,
            text: customerText,
            html: customerHtml,
          },
        }),
      }).then(r => {
        results.webhook = r.ok;
      }).catch(() => {});
    } catch (_) {}
  }

  return results;
};

