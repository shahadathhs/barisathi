"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Loader2, Home, CheckCircle, XCircle, DollarSign } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  BookingStatus,
  getStatusBadge,
  getStatusIcon,
} from "@/functions/RentalRequest";
import { getBookingsForTenant } from "@/services/booking.service";
import { getToken } from "@/services/auth.service";

interface Booking {
  _id: string;
  listing: {
    _id: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    images: string[];
  };
  landlord: {
    _id: string;
    name: string;
  };
  tenant: {
    _id: string;
    name: string;
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

export default function RentalRequestsListTenant() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);

      try {
        const result = await getBookingsForTenant(token || "");
        if (result.success) {
          setBookings(result.data);
        } else {
          toast("Failed to load your booking requests", {
            description: "Failed to load your booking requests",
            icon: <XCircle className="h-5 w-5 text-destructive" />,
          });
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast("Failed to load your booking requests", {
          description: "Failed to load your booking requests",
          icon: <XCircle className="h-5 w-5 text-destructive" />,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchBookings();
  }, [token]);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending")
      return booking.status === BookingStatus.PENDING;
    if (activeTab === "approved")
      return booking.status === BookingStatus.APPROVED;
    if (activeTab === "rejected")
      return booking.status === BookingStatus.REJECTED;
    if (activeTab === "confirmed")
      return booking.status === BookingStatus.CONFIRMED;
    return true;
  });

  const handleOpenPaymentDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPaymentDialog(true);
  };

  const handleCompletePayment = async () => {
    if (!selectedBooking) return;

    setIsProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update booking status to confirmed
      const response = await fetch(
        `/api/bookings/${selectedBooking._id}/confirm`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to confirm booking payment");
      }

      // Update local state to reflect the change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: BookingStatus.CONFIRMED }
            : booking
        )
      );

      toast("Confirmation Successful", {
        description: "Your rental request has been confirmed.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });

      setShowPaymentDialog(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast("Payment Failed", {
        description:
          "An error occurred while processing your payment. Please try again.",
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Rental Requests</h1>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 max-w-xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredBookings.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Booking Requests</CardTitle>
            <CardDescription>
              You haven&apos;t made any rental requests yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Browse available properties and submit a rental request to get
              started.
            </p>
            <Button onClick={() => router.push("/rental-house")}>
              <Home className="mr-2 h-4 w-4" />
              Browse Rental
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((booking) => (
            <Card key={booking._id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-1">
                  <div className="relative h-full">
                    <Image
                      src={
                        booking?.listing?.images[0] ||
                        "/placeholder.svg?height=200&width=200"
                      }
                      alt={booking?.listing?.location}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="p-3 md:col-span-3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {booking.listing.location}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Request submitted on{" "}
                        {format(new Date(booking.createdAt), "PPP")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(booking.status)}
                      <span className="ml-2">
                        {getStatusBadge(booking.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Check-in Date
                      </p>
                      <p>{format(new Date(booking.checkInDate), "PPP")}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Check-out Date
                      </p>
                      <p>{format(new Date(booking.checkOutDate), "PPP")}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Landlord</p>
                      <p>{booking.landlord.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Rent Amount
                      </p>
                      <p className="font-medium">
                        ৳{booking.listing.rentAmount.toLocaleString()}/month
                      </p>
                    </div>
                  </div>

                  {booking.status === BookingStatus.REJECTED &&
                    booking.rejectionReason && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Rejection Reason:
                        </p>
                        <p className="text-sm bg-red-50 p-2 rounded border border-red-100 mt-1">
                          {booking.rejectionReason}
                        </p>
                      </div>
                    )}

                  {booking.status === BookingStatus.APPROVED &&
                    booking.contactPhone && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Contact Phone:
                        </p>
                        <p className="text-sm bg-blue-50 p-2 rounded border border-blue-100 mt-1 font-medium">
                          {booking.contactPhone}
                        </p>
                      </div>
                    )}

                  <div className="flex justify-end mt-4 space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/rental-details/${booking.listing._id}`)
                      }
                    >
                      View Property
                    </Button>

                    {booking.status === BookingStatus.APPROVED && (
                      <Button
                        size="sm"
                        onClick={() => handleOpenPaymentDialog(booking)}
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        Complete Payment
                      </Button>
                    )}

                    {booking.status === BookingStatus.CONFIRMED && (
                      <Button size="sm" variant="outline">
                        Contact Landlord
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              To confirm your booking, please complete the payment for your
              first month&apos;s rent.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="font-medium">Booking Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Property: {selectedBooking.listing.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  Check-in:{" "}
                  {format(new Date(selectedBooking.checkInDate), "PPP")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Check-out:{" "}
                  {format(new Date(selectedBooking.checkOutDate), "PPP")}
                </p>
              </div>

              <div className="border p-4 rounded-md mb-4">
                <div className="flex justify-between mb-2">
                  <span>First Month&apos;s Rent</span>
                  <span>
                    ${selectedBooking.listing.rentAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Security Deposit</span>
                  <span>
                    $
                    {(
                      selectedBooking.listing.rentAmount * 0.5
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service Fee</span>
                  <span>
                    $
                    {(
                      selectedBooking.listing.rentAmount * 0.1
                    ).toLocaleString()}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total Due Now</span>
                  <span>
                    $
                    {(
                      selectedBooking.listing.rentAmount * 1.6
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
              disabled={isProcessingPayment}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCompletePayment}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pay Now
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
