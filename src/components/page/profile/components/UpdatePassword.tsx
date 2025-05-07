"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { UseFormReturn } from "react-hook-form";
import { CheckCircle2, XCircle } from "lucide-react";

export default function UpdatePassword({
  loading,
  passwordForm,
  handlePasswordUpdate,
}: {
  loading: boolean;
  passwordForm: UseFormReturn<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>;
  handlePasswordUpdate: (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Watch the password fields for real-time validation
  const newPassword = passwordForm.watch("newPassword");
  const confirmPassword = passwordForm.watch("confirmPassword");

  // Real-time validation for password matching
  useEffect(() => {
    if (newPassword && confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmPassword]);

  // Real-time validation for password strength
  useEffect(() => {
    if (newPassword) {
      setPasswordStrength({
        hasMinLength: newPassword.length >= 8,
        hasNumber: /\d/.test(newPassword),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      });
    } else {
      setPasswordStrength({
        hasMinLength: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
    }
  }, [newPassword]);

  // Custom submit handler to validate before submitting
  const onSubmit = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
  }) => {
    if (!passwordsMatch) {
      passwordForm.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const submitValues = {
      currentPassword: values.currentPassword || "",
      newPassword: values.newPassword || "",
      confirmPassword: values.confirmPassword || "",
    };

    handlePasswordUpdate(submitValues);

    // Close the dialog after submission
    if (!loading) {
      setOpen(false);
    }
  };

  // Reset form when dialog closes
  const handleDialogChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      passwordForm.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
          <DialogDescription>Change your account password.</DialogDescription>
        </DialogHeader>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="space-y-1 mt-2">
                    <span className="text-sm font-medium">
                      Password requirements:
                    </span>
                    <span className="flex items-center gap-2 text-sm">
                      {passwordStrength.hasMinLength ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>At least 8 characters</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm">
                      {passwordStrength.hasNumber ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>At least one number</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm">
                      {passwordStrength.hasSpecialChar ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>At least one special character</span>
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm New Password"
                      {...field}
                      className={
                        confirmPassword
                          ? passwordsMatch
                            ? "border-green-500"
                            : "border-red-500"
                          : ""
                      }
                    />
                  </FormControl>
                  {confirmPassword && (
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      {passwordsMatch ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">
                            Passwords match
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-500">
                            Passwords do not match
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end gap-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  loading ||
                  !passwordsMatch ||
                  !newPassword ||
                  !confirmPassword ||
                  !passwordStrength.hasMinLength ||
                  !passwordStrength.hasNumber ||
                  !passwordStrength.hasSpecialChar
                }
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
