"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Home,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { getToken } from "@/services/auth.service";
import { toast } from "sonner";
import { getBookingsForLandlord } from "@/services/booking.service";
import {
  BookingStatus,
  getStatusBadge,
  getStatusIcon,
} from "@/functions/RentalRequest";

interface Booking {
  _id: string;
  listing: {
    _id: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    images: string[];
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
  };
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  tenantMessage: string;
  createdAt: string;
  updatedAt: string;
}

export default function RentalRequestsListLandlord() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
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
        const result = await getBookingsForLandlord(token || "");

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
        toast("Failed to load booking requests", {
          description: "Failed to load booking requests",
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

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your property booking requests
          </p>
        </div>
        <Button asChild>
          <a href="/post-rental-house">
            <Home className="mr-2 h-4 w-4" />
            Post New Listing
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {
                bookings.filter((b) => b.status === BookingStatus.PENDING)
                  .length
              }
            </CardTitle>
            <CardDescription>Pending Requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-yellow-500 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Awaiting your response</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {
                bookings.filter((b) => b.status === BookingStatus.APPROVED)
                  .length
              }
            </CardTitle>
            <CardDescription>Approved Requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-blue-500 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Waiting for payment</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {
                bookings.filter((b) => b.status === BookingStatus.CONFIRMED)
                  .length
              }
            </CardTitle>
            <CardDescription>Confirmed Bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-green-500 flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Payment completed</span>
            </div>
          </CardContent>
        </Card>
      </div>

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
              You don&apos;t have any {activeTab !== "all" ? activeTab : ""}{" "}
              booking requests yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Once tenants submit rental requests for your properties, they will
              appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((booking) => (
            <Card key={booking._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{booking.listing.location}</CardTitle>
                    <CardDescription>
                      Request from {booking.tenant.name} on{" "}
                      {format(new Date(booking.createdAt), "PPP")}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(booking.status)}
                    <span className="ml-2">
                      {getStatusBadge(booking.status)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">
                      Property Details
                    </h3>
                    <p className="font-medium">{booking.listing.location}</p>
                    <p>${booking.listing.rentAmount.toLocaleString()}/month</p>
                    <p>
                      {booking.listing.bedrooms}{" "}
                      {booking.listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">
                      Tenant Information
                    </h3>
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {booking.tenant.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {booking.tenant.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {booking.tenant.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">
                      Booking Details
                    </h3>
                    <p>
                      <span className="font-medium">Check-in:</span>{" "}
                      {format(new Date(booking.checkInDate), "PPP")}
                    </p>
                    <p>
                      <span className="font-medium">Check-out:</span>{" "}
                      {format(new Date(booking.checkOutDate), "PPP")}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">
                      Tenant&apos;s Message
                    </h3>
                    <p className="text-sm">{booking.tenantMessage}</p>
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/landlord/requests/${booking._id}`)
                  }
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {booking.status === BookingStatus.PENDING && (
                  <Button
                    onClick={() =>
                      router.push(`/landlord/requests/${booking._id}`)
                    }
                  >
                    Respond to Request
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
