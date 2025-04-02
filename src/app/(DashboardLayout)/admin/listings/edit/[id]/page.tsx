"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Plus, X, ArrowLeft, Save, Ban } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getToken } from "@/services/auth.service";
import { getListingById, updateListingById } from "@/services/listing.service";

// Form validation schema
const formSchema = z.object({
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  rentAmount: z.coerce.number().positive({
    message: "Rent amount must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().positive({
    message: "Number of bedrooms must be a positive integer.",
  }),
  amenities: z
    .string()
    .transform((val) => val.split(",").map((item) => item.trim())),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface Listing {
  _id: string;
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images: string[];
  amenities: string[];
  landlord: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEditListing() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
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
      location: "",
      description: "",
      rentAmount: undefined,
      bedrooms: undefined,
      amenities: [],
      images: [],
    },
  });

  // Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const result = await getListingById(params.id as string, token || "");
        if (!result.success) {
          toast("Failed to load listing details", {
            description: "There was an error loading the listing details.",
            icon: "🚨",
          });
          return;
        }

        const listing: Listing = result.data;

        // Set form values
        form.reset({
          location: listing.location,
          description: listing.description,
          rentAmount: listing.rentAmount,
          bedrooms: listing.bedrooms,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          amenities: listing.amenities.join(", ") as any,
          images: listing.images,
        });

        setUploadedImages(listing.images);
      } catch (error) {
        console.error("Error fetching listing:", error);
        toast("Error", {
          description: "Failed to load listing details",
          icon: <Ban className="h-4 w-4" />,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchListing();
  }, [params.id, form, router, token]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        console.log("Image uploaded:", data);
        if (data.success) return data?.uploadedFile?.secure_url;
        throw new Error("Failed to upload image");
      });

      const newImageUrls = await Promise.all(uploadPromises);
      const allImages = [...uploadedImages, ...newImageUrls];

      setUploadedImages(allImages);
      form.setValue("images", allImages);
      form.trigger("images");

      toast("Images uploaded successfully", {
        description: `${newImageUrls.length} image(s) uploaded.`,
        icon: "🚀",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast("Upload failed", {
        description: "There was an error uploading your images.",
        icon: "🚨",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Remove an image from the uploaded list
  const removeImage = (indexToRemove: number) => {
    const filteredImages = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(filteredImages);
    form.setValue("images", filteredImages);
    form.trigger("images");
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log("Form data:", data);

    try {
      const result = await updateListingById(
        params.id as string,
        data,
        token || ""
      );

      if (!result.success) {
        toast("Update failed", {
          description: "There was an error updating your listing.",
          icon: "🚨",
        });
        return;
      }

      toast("Listing updated successfully", {
        description: "The rental property has been updated.",
        icon: "👍",
      });
    } catch (error) {
      console.error("Error updating listing:", error);
      toast("Update failed", {
        description: "There was an error updating the listing.",
        icon: "🚨",
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

  return (
    <div className="container mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/listings")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Rental Property</CardTitle>
          <CardDescription>
            Update the details and status of this rental property listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, City, State"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The full address of the rental property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the property in detail..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Details about the property, neighborhood, and special
                      features.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rent Amount (৳)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1500" {...field} />
                      </FormControl>
                      <FormDescription>
                        Monthly rent amount in Taka.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Bedrooms</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Parking, Air Conditioning, Laundry, Pool"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List amenities separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Property Images</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("image-upload")?.click()
                            }
                            disabled={isUploading}
                            className="w-full md:w-auto"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Plus className="mr-2 h-4 w-4" />
                                Upload Images
                              </>
                            )}
                          </Button>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </div>

                        {uploadedImages.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {uploadedImages.map((url, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square relative overflow-hidden rounded-md border">
                                  <Image
                                    src={url || "/placeholder.svg"}
                                    alt={`Property image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload multiple images of the property. At least one image
                      is required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/listings")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isUploading}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
