import BookingNotificationEmail from "@/components/emails/booking-notification";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { listing, landlord, tenant, booking } = body;

    // Validate required fields
    if (!listing || !landlord || !tenant || !booking) {
      return NextResponse.json(
        { success: false, message: "Please provide all data" },
        { status: 400 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: "Rental House Landlord <onboarding@resend.dev>",
      to: process.env.LANDLORD_EMAIL as string,
      subject: `New Rental Request for ${listing.location}`,
      react: BookingNotificationEmail({
        landlordName: landlord.name,
        tenantName: tenant.name,
        tenantEmail: tenant.email,
        propertyLocation: listing.location,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        tenantMessage: booking.tenantMessage,
        rentAmount: listing.rentAmount,
        bedrooms: listing.bedrooms,
        propertyImage: listing.images[0] || undefined,
        bookingId: booking._id,
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
