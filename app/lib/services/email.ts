import nodemailer from "nodemailer";
import "dotenv/config";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      console.warn("Email credentials not configured. Emails will not be sent.");
      return null;
    }

    transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user,
        pass,
      },
    });
  }
  return transporter;
}

export const sendContactEmail = async (data: { name: string; email: string; phone?: string; subject: string; message: string }) => {
  const transporter = getTransporter();
  if (!transporter) return false;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to self
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Inquiry from ${data.name}</h2>
        <div style="margin-top: 20px; line-height: 1.6;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px;">
            <strong>Message:</strong><br/>
            ${data.message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
