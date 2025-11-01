import { sendEmail } from "./mailer";

interface WelcomeEmailData {
  to: string;
  name: string;
}

export const sendWelcomeEmail = async (data: WelcomeEmailData) => {
  const { to, name } = data;

  const subject = `Welcome to MyFinance, ${name}! 💼`;

  const text = `
Hello ${name},

Welcome to MyFinance! We're thrilled to have you onboard.

You can now log in to:
- Track your income and expenses
- Set budgets and goals
- Grow your savings with insights

Let's start achieving your financial goals today!

Best regards,
The MyFinance Team
  `;

  const html = `
  <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        body {
          background-color: #f6f9fc;
          font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
          color: #2d3748;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 620px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #0052d4, #4364f7, #6fb1fc);
          color: #ffffff;
          text-align: center;
          padding: 28px 20px;
        }

        .header h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .content {
          padding: 38px 40px;
          line-height: 1.7;
        }

        .content h2 {
          color: #0052d4;
          font-size: 20px;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .content p {
          margin: 10px 0;
          font-size: 15px;
          color: #444;
        }

        .features {
          background-color: #f0f6ff;
          padding: 18px 25px;
          border-radius: 10px;
          margin-top: 22px;
        }

        .features li {
          margin: 10px 0;
          font-size: 15px;
          display: flex;
          align-items: center;
        }

        .features span {
          margin-right: 10px;
          font-size: 18px;
        }

        .button-container {
          text-align: center;
          margin: 40px 0 20px 0;
        }

        .button {
          background: linear-gradient(135deg, #0052d4, #4364f7);
          color: #ffffff;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: 500;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .button:hover {
          background: linear-gradient(135deg, #003ea1, #3857d3);
          transform: translateY(-2px);
        }

        .footer {
          text-align: center;
          padding: 18px;
          background-color: #f9fafb;
          color: #888;
          font-size: 13px;
          border-top: 1px solid #eee;
        }

        .footer p {
          margin: 6px 0;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to MyFinance 💼</h1>
        </div>

        <div class="content">
          <h2>Hey ${name},</h2>
          <p>We’re thrilled to have you join <strong>MyFinance</strong> — your trusted platform for mastering money management and building wealth smarter.</p>
          <p>Here’s how you can get started right away:</p>

          <ul class="features">
  <li><span>💳</span>Track income, expenses, and transactions effortlessly</li>
  <li><span>📊</span>Visualize your spending trends with insightful charts</li>
  <li><span>💰</span>Set savings goals and monitor your growth</li>
  <li><span>🏦</span>Make informed decisions backed by real-time analytics</li>
</ul>

<div style="text-align: center; margin-top: 30px;">
    <a
      href="https://jocular-madeleine-de937f.netlify.app"
      target="_blank"
      rel="noopener noreferrer"
      style="
        display: inline-block;
        background: linear-gradient(90deg, #0066ff, #0047b3);
        color: #ffffff !important;
        padding: 14px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
      "
    >
      Access MyFinance Dashboard
  </a>
</div>

<p>If you have any questions, simply reply to email — garghimanshu778@gmail.com.</p>
<p>Warm regards,<br><strong>The MyFinance Team</strong></p>

        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} MyFinance. All rights reserved.</p>
          <p>Website created by <strong>Himanshu Garg</strong></p>
        </div>
      </div>
    </body>
  </html>
  `;

  try {
    const result = await sendEmail({
      to,
      subject,
      text,
      html,
    });

    return result;
  } catch (error) {
    console.error(`❌ Error sending welcome email to ${to}:`, error);
    throw new Error("Failed to send welcome email via Resend.");
  }
};
