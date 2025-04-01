import { IBooking } from "@/interface/booking.interface";

export const createBooking = async (bookingData: IBooking, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    const result = await res.json();

    // If booking was created successfully, send email notification to landlord
    if (result.success) {
      const landlord = result.data.landlord;
      const tenant = result.data.tenant;
      const listing = result.data.listing;
      const booking = result.data;

      try {
        const response = await fetch("/api/bookingLandlord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listing,
            landlord,
            tenant,
            booking,
          }),
        });

        const data = await response.json();

        console.log("Email notification sent to landlord", data);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Error sending email notification:", emailError);
      }
    }
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating booking:", error);
    Error(error.message);
  }
};

export const getBookingsForTenant = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/tenant`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    Error(error.message);
  }
};
