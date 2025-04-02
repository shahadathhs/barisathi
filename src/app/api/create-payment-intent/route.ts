import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { bookingId, amount, token } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { message: "Booking ID and amount are required" },
        { status: 400 }
      );
    }

    // Fetch booking details to verify it exists and belongs to the user
    const bookingResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await bookingResponse.json();

    if (!result.success) {
      return NextResponse.json(
        { message: "Failed to verify booking" },
        { status: 400 }
      );
    }

    const booking = result.data;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents, rounded to avoid decimal issues
      currency: "usd", // Bangladeshi Taka
      metadata: {
        bookingId,
        userId: booking.tenant._id,
        propertyLocation: booking.listing.location,
      },
    });

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
