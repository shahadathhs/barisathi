"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import {
  Loader2,
  ArrowLeft,
  User,
  Calendar,
  Home,
  Phone,
  DollarSign,
  Mail,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingStatus, getStatusBadge } from "@/functions/RentalRequest";
import { toast } from "sonner";
import { getToken } from "@/services/auth.service";
import { getBookingDetailsById } from "@/services/booking.service";

interface Booking {
  _id: string;
  listing: {
    _id: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    images: string[];
    description: string;
  };
  tenant: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  landlord: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  tenantMessage: string;
  contactPhone?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBookingDetails() {
  const router = useRouter();
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) setToken(token);
    };
    fetchToken();
  }, []);

  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      setIsLoading(true);

      try {
        const result = await getBookingDetailsById(
          params.id as string,
          token || ""
        );
        if (!result.success) {
          toast("Failed to load booking details", {
            description: "Failed to load booking details",
            icon: <XCircle className="h-5 w-5 text-destructive" />,
          });
          return;
        }

        const data = await result.data;
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast("Failed to load booking details", {
          description: "Failed to load booking details",
          icon: <XCircle className="h-5 w-5 text-destructive" />,
        });
      } finally {
        setIsLoading(false);
      }
    };

   if(token) fetchBookingDetails();
  }, [params.id, router, token]);

  if (isLoading || !token) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Booking Not Found</CardTitle>
            <CardDescription>
              The booking you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have permission to view it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/admin/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/requests")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Booking Details</CardTitle>
                  <CardDescription>
                    Created on {format(new Date(booking.createdAt), "PPP")}
                  </CardDescription>
                </div>
                {getStatusBadge(booking.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Check-in Date</p>
                    <p className="text-muted-foreground">
                      {format(new Date(booking.checkInDate), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Check-out Date</p>
                    <p className="text-muted-foreground">
                      {format(new Date(booking.checkOutDate), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Home className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Property</p>
                    <p className="text-muted-foreground">
                      {booking.listing.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Rent Amount</p>
                    <p className="text-muted-foreground">
                      ৳{booking.listing.rentAmount.toLocaleString()}/month
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Tenant Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">
                        {booking.tenant.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        {booking.tenant.email}
                      </p>
                    </div>
                  </div>

                  {booking.tenant.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">
                          {booking.tenant.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Landlord Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">
                        {booking.landlord.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        {booking.landlord.email}
                      </p>
                    </div>
                  </div>

                  {booking.landlord.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">
                          {booking.landlord.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Tenant&apos;s Message
                </h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="italic">{booking.tenantMessage}</p>
                </div>
              </div>

              {booking.status === BookingStatus.REJECTED &&
                booking.rejectionReason && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Rejection Reason
                      </h3>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="italic">{booking.rejectionReason}</p>
                      </div>
                    </div>
                  </>
                )}

              {booking.status === BookingStatus.APPROVED &&
                booking.contactPhone && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Contact Information
                      </h3>
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Phone Number Provided</p>
                          <p className="text-muted-foreground">
                            {booking.contactPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src={
                    booking.listing.images[0] ||
                    "/placeholder.svg?height=300&width=500"
                  }
                  alt={booking.listing.location}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-semibold text-lg">
                {booking.listing.location}
              </h3>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {booking.listing.bedrooms}{" "}
                  {booking.listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </span>
                <span className="font-medium">
                  ৳{booking.listing.rentAmount.toLocaleString()}/month
                </span>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {booking.listing.description}
                </p>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a
                  href={`/rental-details/${booking.listing._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Property Listing
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
