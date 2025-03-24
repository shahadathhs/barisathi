"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  getCurrentUser,
  getToken,
  updateProfile,
  updatePassword,
} from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import BasicInfo from "./components/BasicInfo";
import Loading from "@/components/shared/loading/Loading";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";

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

  if (!user || !token) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Basic Profile Info Card */}
      <BasicInfo user={user} />

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        {/* Update Profile Button with Dialog */}
        <UpdateProfile
          loading={loading}
          profileForm={profileForm}
          handleProfileUpdate={handleProfileUpdate}
        />

        {/* Update Password Button with Dialog */}
        <UpdatePassword
          loading={loading}
          passwordForm={passwordForm}
          handlePasswordUpdate={handlePasswordUpdate}
        />
      </div>
    </div>
  );
}
