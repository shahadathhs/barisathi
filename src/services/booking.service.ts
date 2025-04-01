import { BookingStatus } from "@/functions/RentalRequest";
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

export const getBookingsForLandlord = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/landlord`,
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

export const getBookingDetailsById = async (
  bookingId: string,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}`,
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
    console.error("Error fetching booking details:", error);
    Error(error.message);
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    const result = await res.json();

    // Send email notification to tenant, when booking is approved or rejected by landlord
    if (
      result.success &&
      (status === BookingStatus.APPROVED || status === BookingStatus.REJECTED)
    ) {
      try {
        const response = await fetch("/api/bookingTenant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingDetails: result.data,
            status,
          }),
        });
        const data = await response.json();
        console.log("Email notification sent to tenant", data);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Error sending email notification:", emailError);
      }
    }
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    Error(error.message);
  }
};
