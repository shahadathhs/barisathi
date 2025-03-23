"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getCurrentUser,
  getToken,
  updateProfile,
} from "@/services/auth.service";
import { IUser } from "@/services/auth.interface";
import Spinner from "../shared/Spinner";

// Schema for profile validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Fetch the current user and populate the form.
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        form.reset({
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
        });
      }
      const token = await getToken();
      if (!token) return;
      setToken(token);
    };
    loadUser();
  }, [form]);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    if (!user || !token) return;
    // Merge the updated fields with the existing user object.
    const result = await updateProfile({ ...user, ...data }, token);
    if (result.success) {
      toast.success("Profile updated successfully!", {
        icon: "👋",
        description: "Your profile has been updated successfully!",
      });
      setUser(result.data);
    } else {
      toast.error(result.message, {
        icon: "😢",
        description: "An error occurred while updating your profile.",
      });
    }
    setLoading(false);
  };

  if (!user || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex gap-4">
          <Spinner size="lg" />
          <Spinner size="lg" />
          <Spinner size="lg" />
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-lg mx-auto my-10">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
