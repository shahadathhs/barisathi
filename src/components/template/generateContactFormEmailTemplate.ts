// Helper function to generate the HTML email template
export function generateContactFormEmailTemplate(
  name: string,
  email: string,
  message: string
): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #fff; /* Main text body background */
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #e9ecef; 
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #222; /* A dark shade for headings */
      }
      .details {
        margin-bottom: 20px;
      }
      .details p {
        font-size: 16px;
      }
      .footer {
        font-size: 14px;
        color: #888;
        margin-top: 30px;
        /* Left aligned footer */
      }
      .emoji {
        font-size: 20px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📬 New Contact Form Submission - BariSathi</h1>
      <div class="details">
        <p>Dear BariSathi Team,</p>
        <p>We have received a new message from the contact form on BariSathi. Below are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong></li>
          <li>${message}</li>
        </ul>
      </div>
      <p>If you wish to respond to this inquiry, please reply to the sender at <strong>${email}</strong>.</p>
      <div class="footer">
        <p>Best regards,</p>
        <p>The BariSathi Team</p>
        <p class="emoji">💻✨</p>
        <p>This email was generated automatically from the contact form on BariSathi.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}