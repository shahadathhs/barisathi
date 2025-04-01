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

interface BookingStatusUpdateEmailProps {
  tenantName: string;
  propertyLocation: string;
  status: "approved" | "rejected";
  contactPhone?: string;
  rejectionReason?: string;
  bookingId: string;
}

export const BookingStatusUpdateEmail = ({
  tenantName,
  propertyLocation,
  status,
  contactPhone,
  rejectionReason,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bookingId,
}: BookingStatusUpdateEmailProps) => {
  const isApproved = status === "approved";

  return (
    <Html>
      <Head />
      <Preview>
        Your booking request for {propertyLocation} has been{" "}
        {isApproved ? "approved" : "rejected"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={header}>
            Booking Request {isApproved ? "Approved" : "Rejected"}
          </Heading>

          <Section style={section}>
            <Text style={text}>Hello {tenantName},</Text>

            {isApproved ? (
              <Text style={text}>
                Good news! Your booking request for{" "}
                <strong>{propertyLocation}</strong> has been approved by the
                landlord.
              </Text>
            ) : (
              <Text style={text}>
                We regret to inform you that your booking request for{" "}
                <strong>{propertyLocation}</strong> has been rejected by the
                landlord.
              </Text>
            )}

            {isApproved && contactPhone && (
              <>
                <Text style={text}>
                  You can now proceed with the payment to confirm your booking.
                  The landlord has provided the following contact information:
                </Text>
                <Text style={contactInfo}>
                  <strong>Contact Phone:</strong> {contactPhone}
                </Text>
              </>
            )}

            {!isApproved && rejectionReason && (
              <>
                <Text style={text}>
                  The landlord provided the following reason:
                </Text>
                <Text style={rejectionBox}>&quot;{rejectionReason}&quot;</Text>
              </>
            )}

            {isApproved ? (
              <>
                <Text style={text}>
                  To complete your booking, please log in to your account and
                  make the payment within 48 hours.
                </Text>
                <Section style={buttonContainer}>
                  <Button
                    style={primaryButton}
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/my-bookings`}
                  >
                    Complete Your Booking
                  </Button>
                </Section>
              </>
            ) : (
              <>
                <Text style={text}>
                  Don&apos;t worry, there are many other great properties
                  available. Continue browsing to find your perfect match.
                </Text>
                <Section style={buttonContainer}>
                  <Button
                    style={primaryButton}
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/rental-listings`}
                  >
                    Browse More Properties
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

export default BookingStatusUpdateEmail;

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

const contactInfo = {
  backgroundColor: "#f0f7ff",
  borderRadius: "4px",
  padding: "12px",
  fontSize: "16px",
  color: "#0055a4",
};

const rejectionBox = {
  backgroundColor: "#fff0f0",
  borderRadius: "4px",
  padding: "12px",
  fontSize: "16px",
  color: "#b42424",
  fontStyle: "italic",
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
