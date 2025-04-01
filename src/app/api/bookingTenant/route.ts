import BookingStatusUpdateEmail from "@/components/emails/booking-status-update";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingDetails } = body;

    // Validate required fields
    if (!bookingDetails) {
      return NextResponse.json(
        { success: false, message: "Please provide all data" },
        { status: 400 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: `Rental House Tenant <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.TENANT_EMAIL as string,
      subject: `Your Booking Request has been ${body.status === "approved" ? "Approved" : "Rejected"}`,
      replyTo: bookingDetails.tenant.email,
      react: BookingStatusUpdateEmail({
        tenantName: bookingDetails.tenant.name,
        propertyLocation: bookingDetails.listing.location,
        status: body.status,
        contactPhone: body.contactPhone || "",
        rejectionReason: body.rejectionReason || "",
        bookingId: bookingDetails._id,
      }),
    });

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