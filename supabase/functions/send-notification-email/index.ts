import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: Track IPs and their request counts
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Max 10 requests per hour
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// HTML sanitization to prevent XSS in email clients
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

interface NotificationRequest {
  type: "contact" | "booking";
  data: {
    name: string;
    email: string;
    phone?: string;
    inquiry_type?: string;
    booking_type?: string;
    message?: string;
    organization_name?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for") || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { type, data }: NotificationRequest = await req.json();

    // Validate notification type
    if (!type || !['contact', 'booking'].includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid notification type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!data || !data.name || !data.email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name and email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate field lengths
    if (data.name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be less than 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (data.email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Email must be less than 255 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (data.message && data.message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message must be less than 2000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (data.organization_name && data.organization_name.length > 200) {
      return new Response(
        JSON.stringify({ error: "Organization name must be less than 200 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!adminEmail) {
      console.error("ADMIN_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate email content based on type with sanitized inputs
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = data.phone ? escapeHtml(data.phone) : '';
    const safeInquiryType = data.inquiry_type ? escapeHtml(data.inquiry_type) : '';
    const safeBookingType = data.booking_type ? escapeHtml(data.booking_type) : '';
    const safeOrganization = data.organization_name ? escapeHtml(data.organization_name) : '';
    const safeMessage = data.message ? escapeHtml(data.message) : '';

    const subject = type === "booking" 
      ? `🎉 New Booking Request from ${safeName}`
      : `📧 New Contact Form Submission from ${safeName}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFB84D, #52A5A5); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 15px 0; padding: 12px; background: white; border-radius: 6px; }
            .label { font-weight: bold; color: #52A5A5; display: inline-block; width: 140px; }
            .value { color: #333; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #FFB84D; margin: 20px 0; border-radius: 6px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${subject}</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${safeName}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></span>
              </div>
              ${safePhone ? `
                <div class="info-row">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${safePhone}">${safePhone}</a></span>
                </div>
              ` : ''}
              ${type === "contact" && safeInquiryType ? `
                <div class="info-row">
                  <span class="label">Inquiry Type:</span>
                  <span class="value">${safeInquiryType}</span>
                </div>
              ` : ''}
              ${type === "booking" && safeBookingType ? `
                <div class="info-row">
                  <span class="label">Booking Type:</span>
                  <span class="value">${safeBookingType === 'student' ? 'Individual Student' : 'School Program'}</span>
                </div>
              ` : ''}
              ${safeOrganization ? `
                <div class="info-row">
                  <span class="label">Organization:</span>
                  <span class="value">${safeOrganization}</span>
                </div>
              ` : ''}
              ${safeMessage ? `
                <div class="message-box">
                  <h3 style="color: #52A5A5; margin-top: 0;">Message:</h3>
                  <p style="white-space: pre-wrap;">${safeMessage}</p>
                </div>
              ` : ''}
              <div class="footer">
                <p>Reply directly to this email to respond to ${safeName}</p>
                <p style="color: #999;">Sent from Happy Space World</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Happy Space World <onboarding@resend.dev>",
      to: [adminEmail],
      replyTo: data.email,
      subject: subject,
      html: html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Email notification error");
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
