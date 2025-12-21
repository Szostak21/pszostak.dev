import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingRequest = {
  name: string;
  email: string;
  date: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, date, time } = req.body as BookingRequest;

  // Validation
  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Send notification email to site owner
    await resend.emails.send({
      from: "Booking System <onboarding@resend.dev>", // Use your verified domain in production
      to: process.env.OWNER_EMAIL || "pawelszostak21@gmail.com",
      subject: `📅 New Booking Request from ${name}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 40px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">New Booking Request</h1>
            <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">Someone wants to schedule a call with you.</p>
          </div>
          
          <div style="padding: 40px;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">Contact Details</h2>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="color: #ffffff; font-size: 16px; margin: 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #818cf8;">${email}</a></p>
            </div>
            
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px;">
              <h2 style="color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">Requested Time</h2>
              <p style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0;">${date} at ${time}</p>
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 8px 0 0 0;">30 minute session via Google Meet</p>
            </div>
          </div>
          
          <div style="padding: 24px 40px; background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; text-align: center;">
              Reply to this email or contact ${email} to confirm the booking.
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the person who booked
    await resend.emails.send({
      from: "Paweł Szostak <onboarding@resend.dev>", // Use your verified domain in production
      to: email,
      subject: `Booking Request Received - ${date} at ${time}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 40px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">Thanks for booking, ${name}!</h1>
            <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">Your booking request has been received.</p>
          </div>
          
          <div style="padding: 40px;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">Requested Time</h2>
              <p style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0;">${date} at ${time}</p>
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 8px 0 0 0;">30 minute session via Google Meet</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px;">
              <h2 style="color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">What's Next?</h2>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin: 0;">
                I'll review your request and send you a calendar invite with the Google Meet link once confirmed. 
                You should hear back from me within 24 hours.
              </p>
            </div>
          </div>
          
          <div style="padding: 24px 40px; background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; text-align: center;">
              Questions? Reply to this email or reach out at pawelszostak21@gmail.com
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Booking request sent successfully" });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ error: "Failed to send booking request. Please try again." });
  }
}
