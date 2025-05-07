"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, ArrowLeft, Home } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getToken } from "@/services/auth.service";
import { toast } from "sonner";
import { Listing } from "@/interface/listing.interface";
import { getListingById } from "@/services/listing.service";
import { IBooking } from "@/interface/booking.interface";
import { createBooking } from "@/services/booking.service";

// Form schema with validation
const formSchema = z
  .object({
    checkInDate: z.date({
      required_error: "Check-in date is required",
    }),
    checkOutDate: z.date({
      required_error: "Check-out date is required",
    }),
    tenantMessage: z.string().min(10, {
      message: "Message must be at least 10 characters",
    }),
  })
  .refine((data) => data.checkOutDate > data.checkInDate, {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RequestRental() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listing, setListing] = useState<Listing | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) setToken(token);
    };
    fetchToken();
  }, []);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantMessage: "",
    },
  });

  // Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);

      try {
        // Fetch listing details
        const result = await getListingById(params.id as string);
        if (!result.success) {
          toast("Failed to load property details", {
            description: "Failed to load property details",
            icon: "🚨",
          });
          return;
        }

        setListing(result.data);
      } catch (error) {
        console.error("Error:", error);
        toast("Failed to load property details", {
          description: "Failed to load property details",
          icon: "🚨",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [params.id, router]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (!listing) return;

    setIsSubmitting(true);

    try {
      const bookingData: IBooking = {
        listing: params.id as string,
        landlord: listing.landlord,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        tenantMessage: data.tenantMessage,
      };

      const result = await createBooking(bookingData, token || "");

      if (!result.success) {
        toast(result.message || "Failed to submit rental request", {
          description: "Failed to submit rental request",
          icon: "🚨",
        });
        return;
      }

      toast("Rental request submitted successfully", {
        description: "Your rental request has been sent to the landlord",
        icon: "🎉",
      });

      // Redirect to the tenant requests page
      router.push("/tenant/requests");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast("Failed to submit rental request", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit rental request",
        icon: "🚨",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToListing = () => {
    router.push(`/rental-details/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-14 px-4 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Property Not Found</CardTitle>
            <CardDescription>
              The property you&apos;re trying to request doesn&apos;t exist or
              has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/rental-house")}>
              <Home className="mr-2 h-4 w-4" />
              Browse Listings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Button variant="ghost" onClick={handleBackToListing} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Details Page
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Rental</CardTitle>
              <CardDescription>
                Fill out the form below to request this property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="checkInDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-in Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When you would like to move in
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOutDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-out Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) => {
                                  const checkInDate =
                                    form.getValues("checkInDate");
                                  return (
                                    date < new Date() ||
                                    (checkInDate && date <= checkInDate)
                                  );
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When you plan to end your tenancy
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tenantMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message to Landlord</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Introduce yourself and explain why you're interested in this property..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tell the landlord about yourself and why you would be
                          a good tenant
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      "Submit Rental Request"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Property Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src={
                    listing.images[0] || "/placeholder.svg?height=300&width=500"
                  }
                  alt={listing.location}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-semibold text-lg">{listing.location}</h3>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {listing.bedrooms}{" "}
                  {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </span>
                <span className="font-medium">${listing.rentAmount}/month</span>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {listing.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
