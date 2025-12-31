import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface BookingDetails {
  name: string;
  email: string;
  date: string;
  time: string;
}

const emailStyles = {
  container: `
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background: #0f0f0f;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(124, 58, 237, 0.1);
  `,
  header: `
    background: linear-gradient(135deg, #1a1a2e 0%, #0f0f0f 100%);
    padding: 40px;
    border-bottom: 2px solid rgba(124, 58, 237, 0.2);
  `,
  title: `
    color: #ffffff;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,
  subtitle: `
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    margin: 0;
  `,
  content: `
    padding: 40px;
  `,
  card: `
    background: rgba(124, 58, 237, 0.05);
    border: 1px solid rgba(124, 58, 237, 0.15);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
  `,
  cardTitle: `
    color: rgba(124, 58, 237, 0.7);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 16px 0;
    font-weight: 600;
  `,
  text: `
    color: #ffffff;
    font-size: 16px;
    margin: 0 0 8px 0;
    line-height: 1.6;
  `,
  textMuted: `
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  `,
  highlight: `
    color: #ffffff;
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    text-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
  `,
  link: `
    color: #7c3aed;
    text-decoration: none;
  `,
  footer: `
    padding: 24px 40px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(124, 58, 237, 0.1);
  `,
  footerText: `
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    margin: 0;
    text-align: center;
  `,
  socialLinks: `
    text-align: center;
    padding: 16px 0 0 0;
  `,
  socialLink: `
    color: rgba(124, 58, 237, 0.8);
    text-decoration: none;
    margin: 0 12px;
    font-size: 13px;
    font-weight: 500;
  `,
};

export async function sendClientConfirmation(details: BookingDetails): Promise<void> {
  const { name, email, date, time } = details;

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booking Confirmed</title>
    <style>
      body {
        background: #f8fafc;
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #18181b;
      }
      .container {
        max-width: 600px;
        margin: 32px auto;
        background: #fff;
        border-radius: 16px;
        border: 1px solid #ede9fe;
        box-shadow: 0 2px 16px 0 rgba(124,58,237,0.07);
        overflow: hidden;
      }
      .header {
        background: #7c3aed;
        padding: 32px 40px 24px 40px;
        text-align: center;
      }
      .header h1 {
        color: #fff;
        font-size: 2rem;
        margin: 0 0 8px 0;
        font-weight: 800;
        letter-spacing: -1px;
      }
      .header p {
        color: #e0e7ff;
        font-size: 1rem;
        margin: 0;
      }
      .content {
        padding: 32px 40px;
      }
      .card {
        background: #f3f4f6;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
        border: 1px solid #ede9fe;
      }
      .cardTitle {
        color: #7c3aed;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin: 0 0 16px 0;
        font-weight: 700;
      }
      .details-table {
        width: 100%;
        border-collapse: collapse;
      }
      .details-table td {
        padding: 6px 0;
        font-size: 1rem;
        color: #18181b;
      }
      .details-table td:first-child {
        font-weight: 600;
        width: 120px;
      }
      .footer {
        padding: 24px 40px;
        background: #f3f4f6;
        border-top: 1px solid #ede9fe;
        text-align: center;
      }
      .footerText {
        color: #7c3aed;
        font-size: 0.95rem;
        margin: 0 0 8px 0;
      }
      .socialLinks {
        margin-top: 8px;
      }
      .socialLink {
        color: #7c3aed;
        text-decoration: none;
        margin: 0 10px;
        font-size: 1rem;
        font-weight: 500;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background: #18181b !important;
          color: #f3f4f6 !important;
        }
        .container {
          background: #18181b !important;
          border: 1px solid #312e81 !important;
        }
        .header {
          background: #7c3aed !important;
        }
        .header h1 {
          color: #fff !important;
        }
        .header p {
          color: #c7d2fe !important;
        }
        .content {
          background: #18181b !important;
        }
        .card {
          background: #232136 !important;
          border: 1px solid #312e81 !important;
        }
        .cardTitle {
          color: #a78bfa !important;
        }
        .details-table td {
          color: #f3f4f6 !important;
        }
        .footer {
          background: #232136 !important;
          border-top: 1px solid #312e81 !important;
        }
        .footerText {
          color: #a78bfa !important;
        }
        .socialLink {
          color: #a78bfa !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Booking Confirmed! 🎉</h1>
        <p>Hey ${name}, your session is all set.</p>
      </div>
      <div class="content">
        <div class="card">
          <div class="cardTitle">Session Details</div>
          <table class="details-table">
            <tr>
              <td>📅 Date:</td>
              <td>${date}</td>
            </tr>
            <tr>
              <td>⏰ Time:</td>
              <td>${time}</td>
            </tr>
            <tr>
              <td>⏱️ Duration:</td>
              <td>30 minutes</td>
            </tr>
            <tr>
              <td>📍 Location:</td>
              <td>Google Meet (link sent separately)</td>
            </tr>
          </table>
        </div>
        <div class="card">
          <div class="cardTitle">What's Next?</div>
          <p style="margin:0;color:#64748b;">You'll receive a calendar invite with the Google Meet link within the next few hours.<br>Make sure to check your spam folder just in case!</p>
        </div>
        <div class="card">
          <div class="cardTitle">Need to Reschedule?</div>
          <p style="margin:0;color:#64748b;">No problem! Just reply to this email and let me know what works better for you.</p>
        </div>
      </div>
      <div class="footer">
        <div class="footerText">
          Questions? Reply to this email or reach out at
          <a href="mailto:${process.env.GMAIL_USER}" class="socialLink">${process.env.GMAIL_USER}</a>
        </div>
        <div class="socialLinks">
          <a href="https://github.com/pszostak" class="socialLink">GitHub</a>
          <a href="https://linkedin.com/in/pawel-szostak" class="socialLink">LinkedIn</a>
          <a href="https://pszostak.dev" class="socialLink">Portfolio</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Paweł Szostak" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `✅ Booking Confirmed - ${date} at ${time}`,
    html: htmlContent,
  });
}

export async function sendOwnerNotification(details: BookingDetails): Promise<void> {
  const { name, email, date, time } = details;

  const htmlContent = `
    <div style="${emailStyles.container}">
      <div style="${emailStyles.header}">
        <h1 style="${emailStyles.title}">New Booking Alert 📅</h1>
        <p style="${emailStyles.subtitle}">Someone just scheduled a session with you.</p>
      </div>
      
      <div style="${emailStyles.content}">
        <div style="${emailStyles.card}">
          <h2 style="${emailStyles.cardTitle}">Client Information</h2>
          <p style="${emailStyles.text}"><strong>Name:</strong> ${name}</p>
          <p style="${emailStyles.text}">
            <strong>Email:</strong> 
            <a href="mailto:${email}" style="${emailStyles.link}">${email}</a>
          </p>
        </div>
        
        <div style="${emailStyles.card}">
          <h2 style="${emailStyles.cardTitle}">Session Details</h2>
          <p style="${emailStyles.highlight}">📅 ${date} at ${time}</p>
          <p style="${emailStyles.textMuted}" style="margin-top: 12px;">
            Duration: 30 minutes via Google Meet
          </p>
        </div>

        <div style="${emailStyles.card}">
          <h2 style="${emailStyles.cardTitle}">Action Required</h2>
          <p style="${emailStyles.textMuted}">
            1. Send calendar invite with Google Meet link<br>
            2. Reply to ${email} to confirm<br>
            3. Prepare for the session 🚀
          </p>
        </div>
      </div>
      
      <div style="${emailStyles.footer}">
        <p style="${emailStyles.footerText}">
          This is an automated notification from your booking system.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Booking System" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `📅 New Booking from ${name} - ${date} at ${time}`,
    html: htmlContent,
  });
}

export async function testConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified");
    return true;
  } catch (error) {
    console.error("❌ Gmail SMTP connection failed:", error);
    return false;
  }
}
