import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Button,
  Column,
  Row,
} from "@react-email/components";
import { format } from "date-fns";

interface BookingNotificationEmailProps {
  landlordName: string;
  tenantName: string;
  tenantEmail: string;
  propertyLocation: string;
  checkInDate: string;
  checkOutDate: string;
  tenantMessage: string;
  rentAmount: number;
  bedrooms: number;
  propertyImage?: string;
  bookingId: string;
}

export const BookingNotificationEmail = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  landlordName,
  tenantName,
  tenantEmail,
  propertyLocation,
  checkInDate,
  checkOutDate,
  tenantMessage,
  rentAmount,
  bedrooms,
  propertyImage,
  bookingId,
}: BookingNotificationEmailProps) => {
  const formattedCheckInDate = format(new Date(checkInDate), "MMMM dd, yyyy");
  const formattedCheckOutDate = format(new Date(checkOutDate), "MMMM dd, yyyy");

  return (
    <Html>
      <Head />
      <Preview>
        New Rental Request for your property at {propertyLocation}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={header}>New Rental Request</Heading>

          <Section style={propertySection}>
            {propertyImage && (
              <Img
                src={propertyImage}
                alt="Property Image"
                width="100%"
                height="auto"
              />
            )}
            <Heading as="h2" style={propertyTitle}>
              {propertyLocation}
            </Heading>
            <Row>
              <Column>
                <Text style={propertyDetail}>
                  <strong>Rent:</strong> ${rentAmount}/month
                </Text>
              </Column>
              <Column>
                <Text style={propertyDetail}>
                  <strong>Bedrooms:</strong> {bedrooms}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Section>
            <Heading as="h3" style={sectionTitle}>
              Tenant Information
            </Heading>
            <Text style={text}>
              <strong>Name:</strong> {tenantName}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {tenantEmail}
            </Text>
          </Section>

          <Section>
            <Heading as="h3" style={sectionTitle}>
              Booking Details
            </Heading>
            <Text style={text}>
              <strong>Check-in Date:</strong> {formattedCheckInDate}
            </Text>
            <Text style={text}>
              <strong>Check-out Date:</strong> {formattedCheckOutDate}
            </Text>
            <Text style={text}>
              <strong>Booking ID:</strong> {bookingId}
            </Text>
          </Section>

          <Section style={messageSection}>
            <Heading as="h3" style={sectionTitle}>
              Message from Tenant
            </Heading>
            <Text style={tenantMessageStyle}>&quot;{tenantMessage}&quot;</Text>
          </Section>

          <Section style={actionSection}>
            <Button
              style={primaryButton}
              href={`${process.env.NEXT_PUBLIC_APP_URL}/landlord/requests/${bookingId}`}
            >
              Review Request
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            This is an automated message from Rental House. Please do not reply
            to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingNotificationEmail;

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

const propertySection = {
  marginBottom: "20px",
};

const propertyTitle = {
  fontSize: "20px",
  color: "#333",
  marginBottom: "10px",
};

const propertyDetail = {
  margin: "5px 0",
  color: "#666",
};

// const propertyImage = {
//   borderRadius: "4px",
//   marginBottom: "15px",
// };

const sectionTitle = {
  fontSize: "18px",
  color: "#333",
  marginBottom: "10px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "10px 0",
};

const messageSection = {
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "4px",
  marginTop: "20px",
  marginBottom: "20px",
};

const tenantMessageStyle = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  fontStyle: "italic",
};

const actionSection = {
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
