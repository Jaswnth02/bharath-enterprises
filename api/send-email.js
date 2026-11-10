import nodemailer from 'nodemailer';

// Direct Outlook / SMTP Transporter configuration
export const createSmtpTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || 'contact@bharatok.com';
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    console.warn('[DirectSMTP] Notice: SMTP_PASS is not set in environment. Direct SMTP transport requires your Outlook/email password.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for 587 (STARTTLS)
    auth: { user, pass },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
  });
};

/**
 * Sends both:
 * 1. Notification to cncmurthi37@gmail.com from contact@bharatok.com
 * 2. Auto-reply to the customer from contact@bharatok.com
 */
export const sendDirectEmails = async (enquiry) => {
  const transporter = createSmtpTransporter();
  const ownerEmail = process.env.OWNER_EMAIL || 'cncmurthi37@gmail.com';
  const senderEmail = process.env.SMTP_USER || 'contact@bharatok.com';
  const customerEmail = (enquiry.email || '').trim();
  const ref = enquiry.enquiryId || enquiry.id || `ENQ-${Date.now().toString(36).toUpperCase()}`;

  if (!transporter) {
    return {
      success: false,
      error: 'SMTP_PASS_NOT_CONFIGURED',
      message: 'SMTP credentials missing. Please set SMTP_PASS in .env to connect your Outlook account.',
    };
  }

  const results = { adminSent: false, customerSent: false };

  // 1. Send Lead to cncmurthi37@gmail.com
  try {
    const adminMailOptions = {
      from: `"Bharath Enterprises Leads" <${senderEmail}>`,
      to: ownerEmail,
      cc: senderEmail,
      replyTo: customerEmail || senderEmail,
      subject: `[New Lead #${ref}] from ${enquiry.customerName}`,
      text: `A new enquiry was submitted on Bharath Enterprises:

Reference: #${ref}
Customer Name: ${enquiry.customerName}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Company: ${enquiry.companyName || 'Not specified'}
Type: ${enquiry.enquiryType || 'General Business'}

Message / Requirements:
${enquiry.message || enquiry.specifications || 'No additional message.'}

Time: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0A192F; color: #FFFFFF; padding: 24px;">
            <p style="margin: 0; font-size: 11px; color: #C5A880; font-weight: bold; letter-spacing: 2px;">BHARATH ENTERPRISES</p>
            <h2 style="margin: 6px 0 0; color: #FFFFFF;">New Form Submission Received</h2>
          </div>
          <div style="padding: 24px; background-color: #FFFFFF;">
            <p style="font-size: 13px; color: #4B5563;"><strong>Reference:</strong> #${ref}</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; width: 35%;">Name:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${enquiry.customerName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #0A192F;">${enquiry.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${enquiry.phone}" style="color: #0A192F;">${enquiry.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280;">Company:</td>
                <td style="padding: 8px 0; color: #111827;">${enquiry.companyName || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280;">Type:</td>
                <td style="padding: 8px 0; color: #111827;">${enquiry.enquiryType || 'General Business'}</td>
              </tr>
            </table>
            <div style="background-color: #F9FAFB; border-left: 4px solid #C5A880; padding: 14px; border-radius: 6px; margin-top: 16px;">
              <p style="margin: 0; font-size: 12px; color: #6B7280; font-weight: bold; text-transform: uppercase;">Message</p>
              <p style="margin: 6px 0 0; font-size: 13.5px; color: #1F2937; white-space: pre-wrap;">${enquiry.message || enquiry.specifications || 'No message provided.'}</p>
            </div>
            <div style="margin-top: 24px;">
              <a href="mailto:${enquiry.email}?subject=Re: Your enquiry with Bharath Enterprises [${ref}]" style="display: inline-block; background-color: #0A192F; color: #FFFFFF; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
                Reply Directly
              </a>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    results.adminSent = true;
    console.info(`[DirectSMTP] Lead email successfully dispatched to ${ownerEmail}`);
  } catch (err) {
    console.error('[DirectSMTP] Failed to send lead email:', err.message);
    results.adminError = err.message;
  }

  // 2. Send Auto-Reply to Customer
  if (customerEmail) {
    try {
      const customerMailOptions = {
        from: `"Bharath Enterprises" <${senderEmail}>`,
        to: customerEmail,
        replyTo: senderEmail,
        subject: `Thank You for Your Enquiry - Bharath Enterprises [Ref: #${ref}]`,
        text: `Dear ${enquiry.customerName || 'Valued Client'},

Thank you for contacting Bharath Enterprises. We have successfully received your enquiry regarding "${enquiry.enquiryType || 'Industrial Trade & Services'}".

Reference Number: #${ref}
Status: Received and queued for technical desk review

Our team will evaluate your requirements and get back to you within 24 business hours.

Direct Support Contact:
- Email: ${senderEmail}
- Phone: +91 96009 49927
- Location: Coimbatore & Coonoor, Tamil Nadu, India

Warm regards,
Commercial Trade Desk
Bharath Enterprises`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0A192F; color: #FFFFFF; padding: 28px 24px;">
              <p style="margin: 0; font-size: 11px; color: #C5A880; font-weight: bold; letter-spacing: 2px;">BHARATH ENTERPRISES</p>
              <h2 style="margin: 6px 0 0; color: #FFFFFF;">Enquiry Confirmation</h2>
              <p style="margin: 4px 0 0; font-size: 12px; color: #94A3B8;">Industrial Boilers • Spares & Revamps • Project DPR • Global Trade Facilitation</p>
            </div>
            <div style="padding: 24px; background-color: #FFFFFF;">
              <p style="font-size: 14px; color: #111827;">Dear <strong>${enquiry.customerName || 'Valued Client'}</strong>,</p>
              <p style="font-size: 13.5px; color: #374151; line-height: 1.6;">
                Thank you for contacting Bharath Enterprises. We have received your submission regarding <strong>${enquiry.enquiryType || 'Industrial & Trade Services'}</strong>.
              </p>
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; margin: 20px 0;">
                <p style="margin: 4px 0; font-size: 13px; color: #64748B;">Reference Ticket: <strong style="color: #0A192F; font-family: monospace;">#${ref}</strong></p>
                <p style="margin: 4px 0; font-size: 13px; color: #64748B;">Response Window: <strong style="color: #059669;">Within 24 business hours</strong></p>
              </div>
              <p style="font-size: 13px; color: #4B5563; line-height: 1.6;">
                Our technical procurement desk is reviewing your requirements. If you have an urgent plant requirement, you may contact our desk directly at <a href="tel:+919600949927" style="color: #0A192F; font-weight: bold;">+91 96009 49927</a>.
              </p>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280;">
                Warm regards,<br />
                <strong>Commercial Operations Team</strong><br />
                Bharath Enterprises • Coimbatore & Coonoor, Tamil Nadu
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(customerMailOptions);
      results.customerSent = true;
      console.info(`[DirectSMTP] Auto-reply email successfully dispatched to ${customerEmail}`);
    } catch (err) {
      console.error('[DirectSMTP] Failed to send auto-reply:', err.message);
      results.customerError = err.message;
    }
  }

  return { success: results.adminSent || results.customerSent, ...results };
};

// Handler for Vercel / serverless deployments
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const enquiry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const result = await sendDirectEmails(enquiry);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

