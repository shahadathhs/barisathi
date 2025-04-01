"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  Home,
  Phone,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingStatus, getStatusBadge } from "@/functions/RentalRequest";
import { getToken } from "@/services/auth.service";
import {
  getBookingDetailsById,
  updateBookingStatus,
} from "@/services/booking.service";
import { toast } from "sonner";

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

export default function BookingDetails() {
  const router = useRouter();
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
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
        const response = await getBookingDetailsById(
          params.id as string,
          token || ""
        );

        const data = response.data;
        setBooking(data);
        setContactPhone(data?.landlord?.phone || "");
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

    if (token && params.id) {
      fetchBookingDetails();
    }
  }, [params.id, token]);

  // Handle approve booking
  const handleApprove = async () => {
    if (!booking) return;
    if (!contactPhone.trim()) {
      toast(" Contact phone is required", {
        description: "Contact phone is required",
        icon: <XCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateBookingStatus(
        booking._id,
        BookingStatus.APPROVED,
        token || ""
      );

      if (result.success) {
        setBooking(result.data);

        toast("Booking Approved", {
          description: "Successfully approved booking request",
          icon: <CheckCircle2 className="h-5 w-5 text-destructive" />,
        });
      }
      // router.push("/landlord/requests");
    } catch (error) {
      console.error("Error approving booking:", error);
      toast("Failed to approve booking", {
        description: "Failed to approve booking",
        icon: <XCircle className="h-5 w-5 text-destructive" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reject booking
  const handleReject = async () => {
    if (!booking) return;
    if (!rejectionReason.trim()) {
      toast("Rejection reason is required", {
        description: "Rejection reason is required",
        icon: <XCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateBookingStatus(
        booking._id,
        BookingStatus.REJECTED,
        token || ""
      );

      if (result.success) {
        setBooking(result.data);

        toast("Booking Rejected", {
          description:
            "The booking request has been rejected and the tenant has been notified.",
        });
      }
      // router.push("/landlord/requests");
    } catch (error) {
      console.error("Error rejecting booking:", error);
      toast("Failed to reject booking request", {
        description: "Failed to reject booking request",
        icon: <XCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
            <Button onClick={() => router.push("/landlord")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push("/landlord")}
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
                  <CardTitle className="text-2xl">Booking Request</CardTitle>
                  <CardDescription>
                    From {booking.tenant.name} on{" "}
                    {format(new Date(booking.createdAt), "PPP")}
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
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
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

            {booking.status === BookingStatus.PENDING && (
              <CardFooter className="flex justify-end space-x-4 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Booking Request</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for rejecting this booking
                        request.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="rejection-reason" className="block mb-2">
                        Reason for Rejection
                      </Label>
                      <Textarea
                        id="rejection-reason"
                        placeholder="Enter your reason for rejecting this booking..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setRejectionReason("")}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleReject}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Rejecting...
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject Request
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Approve Booking Request</DialogTitle>
                      <DialogDescription>
                        Please provide a contact phone number for the tenant.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="contact-phone" className="block mb-2">
                        Contact Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        disabled
                        placeholder="Enter your phone number..."
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" disabled={isSubmitting}>
                        Cancel
                      </Button>
                      <Button onClick={handleApprove} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Approving...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve Request
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            )}
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
                <a href={`/rental-details/${booking.listing._id}`}>
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
