import { generateContactFormEmailTemplate } from "@/components/template/generateContactFormEmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Generate HTML email template
    const htmlContent = generateContactFormEmailTemplate(name, email, message);

    // Send email using Resend with HTML content
    const data = await resend.emails.send({
      from: `Contact Form BariSathi <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.CONTACT_FORM_EMAIL as string,
      replyTo: email,
      subject: "New Contact Form Submission - BariSathi",
      html: htmlContent,
    });

    if (data.error) {
      console.error("Error sending email:", data.error);
      return NextResponse.json(
        { success: false, message: "Failed to send email", error: data.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Email sent", data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Something went wrong",
        errorDetails: error,
      },
      { status: 500 }
    );
  }
}

// * this is mail gun implementation
// try {
//   const formData = new URLSearchParams();
//   formData.append(
//     "from",
//     `Contact Form <noreply@${process.env.NEXT_PUBLIC_MAILGUN_DOMAIN}>`
//   );
//   formData.append("to", process.env.NEXT_PUBLIC_MAILGUN_EMAIL as string);
//   formData.append("subject", "Contact Form Submission");
//   formData.append(
//     "text",
//     `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//   );

//   const res = await fetch(
//     `https://api.mailgun.net/v3/${process.env.NEXT_PUBLIC_MAILGUN_DOMAIN}/messages`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `api:${process.env.NEXT_PUBLIC_MAILGUN_API_KEY}`
//         ).toString("base64")}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formData.toString(),
//     }
//   );

//   const data = await res.json();
//   if (res.ok) {
//     return NextResponse.json({ success: true, message: "Email sent", data });
//   } else {
//     return NextResponse.json(
//       { success: false, message: "Failed to send email", error: data },
//       { status: 500 }
//     );
//   }
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// } catch (error: any) {
//   console.error("Error sending email:", error);
//   return NextResponse.json(
//     { success: false, message: error?.message || "Something went wrong" },
//     { status: 500 }
//   );
// }
