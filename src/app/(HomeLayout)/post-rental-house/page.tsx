"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
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
import { toast } from "sonner";
import { getToken } from "@/services/auth.service";
import { createListing } from "@/services/listing.service";
import Loading from "@/components/shared/loading/Loading";

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

export default function PostRentalHouse() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

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
      bedrooms: 1,
      amenities: [""],
      images: [],
    },
  });

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
        description: "Your images have been uploaded.",
        duration: 3000,
        icon: "🎉",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast("Image upload failed", {
        description: "There was an error uploading your images.",
        duration: 3000,
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

  if (!token) return <Loading />;

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const result = await createListing(data, token);

      if (!result.success) {
        throw new Error(result.message || "Failed to create listing");
      }
      toast("Listing created successfully", {
        description: "Your rental property has been listed.",
        duration: 3000,
        icon: "🎉",
      });

      // * redirect to rental house page
      setTimeout(() => router.push("/rental-house"), 3000);
    } catch (error) {
      console.error("Error creating listing:", error);
      toast("Failed to create listing", {
        description: "There was an error creating your listing.",
        duration: 3000,
        icon: "🚨",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl">Post a New Rental Property</CardTitle>
          <CardDescription>
            Fill in the details below to list your rental property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Location */}
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
                      Enter the full address of your rental property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your property in detail..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include details about the property, neighborhood, and any
                      special features.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rent Amount */}
              <FormField
                control={form.control}
                name="rentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1500" {...field} />
                    </FormControl>
                    <FormDescription>
                      Monthly rent amount in dollars.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bedrooms */}
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

              {/* Amenities */}
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

              {/* Images */}
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
                      Upload multiple images of your property. At least one
                      image is required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Post Rental Listing"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
