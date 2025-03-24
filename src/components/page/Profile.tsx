"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  getCurrentUser,
  getToken,
  updateProfile,
  updatePassword,
} from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import Spinner from "@/components/shared/Spinner";

// Validation schema for profile update
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});
type ProfileFormData = z.infer<typeof profileSchema>;

// Validation schema for password update
const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Setup react-hook-form for profile update
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  // Setup react-hook-form for password update
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  // Load user data and token
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      const tkn = await getToken();
      if (currentUser && tkn) {
        setUser(currentUser);
        setToken(tkn);
        profileForm.reset({
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
        });
      }
    };
    loadUser();
  }, [profileForm]);

  const handleProfileUpdate = async (data: ProfileFormData) => {
    if (!user || !token) return;
    setLoading(true);
    const result = await updateProfile({ ...user, ...data }, token);
    setLoading(false);
    if (result?.success) {
      toast.success("Profile updated successfully!", {
        icon: "👋",
        description: "Your profile has been updated.",
      });
      setUser(result.data);
    } else {
      toast.error(result?.message || "Profile update failed.");
    }
  };

  const handlePasswordUpdate = async (data: PasswordFormData) => {
    if (!token) return;
    setLoading(true);
    const result = await updatePassword(data, token);
    setLoading(false);
    if (result?.success) {
      toast.success("Password updated successfully!");
    } else {
      toast.error(result?.message || "Password update failed.");
    }
  };

  if (!user || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Basic Profile Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        {/* Update Profile Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    placeholder="Your Name"
                    {...profileForm.register("name")}
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {profileForm.formState.errors.name?.message}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...profileForm.register("email")}
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {profileForm.formState.errors.email?.message}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Input
                    placeholder="0123456789"
                    {...profileForm.register("phone")}
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {profileForm.formState.errors.phone?.message}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Update Password Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Update Password</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Password</DialogTitle>
              <DialogDescription>
                Change your account password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    {...passwordForm.register("currentPassword")}
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {passwordForm.formState.errors.currentPassword?.message}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...passwordForm.register("newPassword")}
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {passwordForm.formState.errors.newPassword?.message}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
