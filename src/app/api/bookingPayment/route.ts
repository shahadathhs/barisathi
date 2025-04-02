import BookingConfirmedEmail from "@/components/emails/booking-confirmed";
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

    // Send email notifications to tenant and landlord

    // Send confirmation email to tenant
    const dataTenant = await resend.emails.send({
      from: `BariSathi <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.TENANT_EMAIL as string,
      replyTo: bookingDetails.tenant.email,
      subject: "Your Booking is Confirmed!",
      react: BookingConfirmedEmail({
        recipientName: bookingDetails.tenant.name,
        propertyLocation: bookingDetails.listing.location,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        landlordName: bookingDetails.landlord.name,
        contactPhone:
          bookingDetails.contactPhone || bookingDetails.landlord.phone,
        rentAmount: bookingDetails.listing.rentAmount,
        bookingId: bookingDetails._id,
        isLandlord: false,
      }),
    });

    // Send notification to landlord
    const dataLandlord = await resend.emails.send({
      from: `BariSathi <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.LANDLORD_EMAIL as string,
      replyTo: bookingDetails.landlord.email,
      subject: "Booking Confirmed: Payment Received",
      react: BookingConfirmedEmail({
        recipientName: bookingDetails.landlord.name,
        propertyLocation: bookingDetails.listing.location,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        tenantName: bookingDetails.tenant.name,
        rentAmount: bookingDetails.listing.rentAmount,
        bookingId: bookingDetails._id,
        isLandlord: true,
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Email sent",
      data: {
        dataTenant,
        dataLandlord,
      },
    });
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
