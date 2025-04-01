import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from "@react-email/components";
import { format } from "date-fns";

interface BookingConfirmedEmailProps {
  recipientName: string;
  propertyLocation: string;
  checkInDate: string;
  checkOutDate: string;
  landlordName?: string;
  tenantName?: string;
  contactPhone?: string;
  rentAmount: number;
  bookingId: string;
  isLandlord: boolean;
}

export const BookingConfirmedEmail = ({
  recipientName,
  propertyLocation,
  checkInDate,
  checkOutDate,
  landlordName,
  tenantName,
  contactPhone,
  rentAmount,
  bookingId,
  isLandlord,
}: BookingConfirmedEmailProps) => {
  const formattedCheckInDate = format(new Date(checkInDate), "MMMM dd, yyyy");
  const formattedCheckOutDate = format(new Date(checkOutDate), "MMMM dd, yyyy");

  return (
    <Html>
      <Head />
      <Preview>
        {isLandlord
          ? `Booking Confirmed: Payment received for ${propertyLocation}`
          : `Your booking for ${propertyLocation} is confirmed!`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={header}>
            {isLandlord ? "Booking Confirmed!" : "Your Booking is Confirmed!"}
          </Heading>

          <Section style={section}>
            <Text style={text}>Hello {recipientName},</Text>

            {isLandlord ? (
              <Text style={text}>
                Good news! {tenantName} has completed the payment for{" "}
                <strong>{propertyLocation}</strong>. The booking is now
                confirmed.
              </Text>
            ) : (
              <Text style={text}>
                Your payment has been received and your booking for{" "}
                <strong>{propertyLocation}</strong> is now confirmed. We&apos;re
                excited for your upcoming stay!
              </Text>
            )}

            <Section style={bookingSummary}>
              <Heading as="h3" style={subheading}>
                Booking Summary
              </Heading>

              <Text style={summaryItem}>
                <strong>Property:</strong> {propertyLocation}
              </Text>
              <Text style={summaryItem}>
                <strong>Check-in Date:</strong> {formattedCheckInDate}
              </Text>
              <Text style={summaryItem}>
                <strong>Check-out Date:</strong> {formattedCheckOutDate}
              </Text>
              <Text style={summaryItem}>
                <strong>Monthly Rent:</strong> ৳{rentAmount.toLocaleString()}
              </Text>
              <Text style={summaryItem}>
                <strong>Booking ID:</strong> {bookingId}
              </Text>

              {!isLandlord && landlordName && (
                <Text style={summaryItem}>
                  <strong>Landlord:</strong> {landlordName}
                </Text>
              )}

              {!isLandlord && contactPhone && (
                <Text style={summaryItem}>
                  <strong>Contact:</strong> {contactPhone}
                </Text>
              )}

              {isLandlord && tenantName && (
                <Text style={summaryItem}>
                  <strong>Tenant:</strong> {tenantName}
                </Text>
              )}
            </Section>

            {isLandlord ? (
              <>
                <Text style={text}>
                  You can now contact the tenant to arrange the move-in process
                  and key handover.
                </Text>
                <Section style={buttonContainer}>
                  <Button
                    style={primaryButton}
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/landlord/requests/${bookingId}`}
                  >
                    View Booking Details
                  </Button>
                </Section>
              </>
            ) : (
              <>
                <Text style={text}>
                  You can contact your landlord using the provided contact
                  information to arrange your move-in. We hope you enjoy your
                  new home!
                </Text>
                <Section style={buttonContainer}>
                  <Button
                    style={primaryButton}
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/tenant/requests`}
                  >
                    View Booking Details
                  </Button>
                </Section>
              </>
            )}
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Thank you for using BariSathi. If you have any questions, please
            contact our support team.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmedEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  borderRadius: "4px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const header = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const section = {
  padding: "0 20px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const bookingSummary = {
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
  padding: "16px",
  margin: "24px 0",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 16px 0",
};

const summaryItem = {
  margin: "8px 0",
  fontSize: "14px",
  lineHeight: "20px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const primaryButton = {
  backgroundColor: "#4f46e5",
  borderRadius: "4px",
  padding: "10px 20px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
};

const divider = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  marginTop: "20px",
  textAlign: "center" as const,
};
