import nodemailer from 'nodemailer';

// Direct Outlook / Office 365 SMTP Transporter configuration
export const createSmtpTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || 'contact@bharatok.com';
  const pass = process.env.SMTP_PASS || 'BHARATHENTERPRISES@123';

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
};

/**
 * Sends both:
 * 1. Admin lead notification to cncmurthi37@gmail.com (with cc to contact@bharatok.com)
 * 2. Auto-reply confirmation to the customer
 */
export const sendDirectEmails = async (enquiry) => {
  const transporter = createSmtpTransporter();
  const ownerEmail = process.env.OWNER_EMAIL || 'cncmurthi37@gmail.com';
  const senderEmail = process.env.SMTP_USER || 'contact@bharatok.com';
  const customerEmail = (enquiry.email || '').trim();
  const ref = enquiry.enquiryId || enquiry.id || `ENQ-${Date.now().toString(36).toUpperCase()}`;

  const results = { adminSent: false, customerSent: false };

  // 1. Send Lead Alert to cncmurthi37@gmail.com
  try {
    const adminMailOptions = {
      from: `"Bharath Enterprises Leads" <${senderEmail}>`,
      to: ownerEmail,
      cc: senderEmail,
      replyTo: customerEmail || senderEmail,
      subject: `[New Lead #${ref}] ${enquiry.enquiryType || 'General Business'} from ${enquiry.customerName}`,
      text: `A new enquiry was submitted on Bharath Enterprises (bharatok.com):

Reference Ticket: #${ref}
Customer Name: ${enquiry.customerName}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Company: ${enquiry.companyName || 'Not specified'}
Enquiry Type: ${enquiry.enquiryType || 'General Business'}
Product / Service: ${enquiry.productOrService || 'Not specified'}
Timeline: ${enquiry.targetTimeline || 'Not specified'}
Urgency: ${enquiry.urgencyLevel || 'Standard'}

Message / Scope:
${enquiry.message || enquiry.specifications || enquiry.strategicIntent || 'No additional message provided.'}

Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; background: #ffffff;">
          <div style="background-color: #0A192F; color: #FFFFFF; padding: 26px 30px;">
            <p style="margin: 0; font-size: 11px; color: #C5A880; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">BHARATH ENTERPRISES · LEAD DESK</p>
            <h2 style="margin: 6px 0 0; color: #FFFFFF; font-size: 20px;">New Commercial Lead Received</h2>
            <p style="margin: 4px 0 0; font-size: 12px; color: #94A3B8;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
          <div style="padding: 24px 30px;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 8px; margin-bottom: 18px;">
              <span style="font-size: 12px; color: #64748B; font-weight: 600;">Reference Ticket: </span>
              <span style="font-size: 14px; color: #0A192F; font-weight: 800; font-family: monospace;">#${ref}</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; width: 36%; font-weight: 600;">Customer Name:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 700;">${enquiry.customerName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #0A192F; font-weight: 600; text-decoration: none;">${enquiry.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${enquiry.phone}" style="color: #0A192F; font-weight: 600; text-decoration: none;">${enquiry.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Company:</td>
                <td style="padding: 8px 0; color: #111827;">${enquiry.companyName || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Enquiry Type:</td>
                <td style="padding: 8px 0; color: #111827;">${enquiry.enquiryType || 'General Business'}</td>
              </tr>
              ${enquiry.productOrService ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Product / Service:</td>
                <td style="padding: 8px 0; color: #111827;">${enquiry.productOrService}</td>
              </tr>` : ''}
              ${enquiry.targetTimeline ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Timeline:</td>
                <td style="padding: 8px 0; color: #111827;">${enquiry.targetTimeline}</td>
              </tr>` : ''}
            </table>

            <div style="background-color: #F8FAFC; border-left: 4px solid #C5A880; padding: 14px 16px; border-radius: 6px; margin-top: 18px;">
              <p style="margin: 0 0 6px; font-size: 11px; color: #6B7280; font-weight: 700; text-transform: uppercase;">Message / Scope</p>
              <p style="margin: 0; font-size: 13.5px; color: #1F2937; line-height: 1.6; white-space: pre-wrap;">${enquiry.message || enquiry.specifications || enquiry.strategicIntent || 'No additional message provided.'}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #E5E7EB;">
              <a href="mailto:${enquiry.email}?subject=Re: Enquiry #${ref} - Bharath Enterprises" style="display: inline-block; background-color: #0A192F; color: #FFFFFF; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 700;">
                Reply Directly via Email
              </a>
              ${enquiry.phone ? `
              <a href="https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 700; margin-left: 8px;">
                Open on WhatsApp
              </a>` : ''}
            </div>
          </div>
          <div style="background-color: #F9FAFB; padding: 14px 30px; border-top: 1px solid #E5E7EB; font-size: 11px; color: #6B7280; text-align: center;">
            Dispatched automatically from Bharath Enterprises portal (bharatok.com)
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    results.adminSent = true;
    console.info(`[DirectSMTP] Lead alert email dispatched to ${ownerEmail}`);
  } catch (err) {
    console.error('[DirectSMTP] Failed to send lead alert email:', err.message);
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

Thank you for contacting Bharath Enterprises. We have successfully received your enquiry regarding "${enquiry.enquiryType || 'Industrial & Trade Services'}".

Reference Ticket: #${ref}
Status: Received and queued for technical desk review
Response Window: Within 24 business hours

Our trade desk is currently reviewing your requirements. For urgent coordination, you may reach us directly:
- Email: ${senderEmail}
- Phone / WhatsApp: +91 96009 49927
- Location: Coimbatore & Coonoor, Tamil Nadu, India

Warm regards,
Commercial Operations Team
Bharath Enterprises`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; background: #ffffff;">
            <div style="background-color: #0A192F; color: #FFFFFF; padding: 28px 24px;">
              <p style="margin: 0; font-size: 11px; color: #C5A880; font-weight: bold; letter-spacing: 2px;">BHARATH ENTERPRISES</p>
              <h2 style="margin: 6px 0 0; color: #FFFFFF; font-size: 20px;">Enquiry Confirmation</h2>
              <p style="margin: 4px 0 0; font-size: 12px; color: #94A3B8;">Nilgiris Tourism · Wholesale Food Distribution · Plywood Trading · Rubber Recycling</p>
            </div>
            <div style="padding: 24px; background-color: #FFFFFF;">
              <p style="font-size: 14px; color: #111827;">Dear <strong>${enquiry.customerName || 'Valued Client'}</strong>,</p>
              <p style="font-size: 13.5px; color: #374151; line-height: 1.6;">
                Thank you for contacting Bharath Enterprises. We have successfully received your enquiry regarding <strong>"${enquiry.enquiryType || 'Industrial & Trade Services'}"</strong>.
              </p>
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; margin: 18px 0;">
                <p style="margin: 3px 0; font-size: 13px; color: #64748B;">Reference Ticket: <strong style="color: #0A192F; font-family: monospace;">#${ref}</strong></p>
                <p style="margin: 3px 0; font-size: 13px; color: #64748B;">Status: <strong style="color: #059669;">Received and queued for technical desk review</strong></p>
                <p style="margin: 3px 0; font-size: 13px; color: #64748B;">Response Window: <strong style="color: #0A192F;">Within 24 business hours</strong></p>
              </div>
              <p style="font-size: 13px; color: #4B5563; line-height: 1.6;">
                Our trade desk is currently reviewing your requirements. For urgent coordination, you may reach us directly:
              </p>
              <div style="background-color: #FAF8F5; border: 1px solid #E7E3DC; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-size: 13px; color: #374151; line-height: 1.6;">
                <div>• <strong>Email:</strong> <a href="mailto:${senderEmail}" style="color: #0A192F; text-decoration: none;">${senderEmail}</a></div>
                <div>• <strong>Phone / WhatsApp:</strong> <a href="tel:+919600949927" style="color: #0A192F; text-decoration: none; font-weight: 600;">+91 96009 49927</a></div>
                <div>• <strong>Location:</strong> Coimbatore & Coonoor, Tamil Nadu, India</div>
              </div>
              <div style="margin-top: 22px; padding-top: 16px; border-top: 1px solid #E5E7EB; font-size: 13px; color: #6B7280;">
                Warm regards,<br />
                <strong style="color: #0A192F;">Commercial Operations Team</strong><br />
                Bharath Enterprises
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(customerMailOptions);
      results.customerSent = true;
      console.info(`[DirectSMTP] Auto-reply email dispatched to ${customerEmail}`);
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
    console.error('[API send-email error]:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
