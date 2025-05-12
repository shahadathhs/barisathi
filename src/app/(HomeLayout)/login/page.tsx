"use client";

import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserRole, loginUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Form type
type LoginFormValues = z.infer<typeof loginSchema>;

// Predefined credentials
const predefinedCredentials = {
  admin: { email: "admin@gmail.com", password: "123456" },
  tenant: { email: "tenant@gmail.com", password: "123456" },
  landlord: { email: "landlord@gmail.com", password: "123456" },
};

/**
 * This component renders a login page. It's a wrapper around the LoginContent
 * component, and it adds a suspense boundary to handle loading states.
 *
 * The page can be accessed at /login, and it accepts a redirectPath query
 * parameter. If the user successfully logs in, they will be redirected to
 * the page they were on before they logged in.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || null;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    const response = await loginUser(data);

    if (response?.success) {
      toast.success("Login successful!");
      const userRole = await getUserRole();
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        if (userRole === "admin") router.push("/admin/analytics");
        else if (userRole === "tenant") router.push("/tenant/requests");
        else if (userRole === "landlord") router.push("/landlord/listings");
      }
    } else {
      toast.error(response?.message || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  const loginWithRole = async (role: "admin" | "tenant" | "landlord") => {
    const credentials = predefinedCredentials[role];
    form.setValue("email", credentials.email);
    form.setValue("password", credentials.password);

    setLoading(true);

    const response = await loginUser(credentials);

    if (response?.success) {
      toast.success(`Logged in as ${role}!`);
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        if (role === "admin") router.push("/admin/analytics");
        else if (role === "tenant") router.push("/tenant/requests");
        else if (role === "landlord") router.push("/landlord/listings");
      }
    } else {
      toast.error(response?.message || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center px-4 py-16 max-w-3xl mx-auto md:border-l md:border-r">
      <Card className="w-full max-w-md shadow">
        <CardHeader>
          <CardTitle className="text-xl">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="custom"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="custom">Custom Login</TabsTrigger>
              <TabsTrigger value="predefined">Quick Login</TabsTrigger>
            </TabsList>

            <TabsContent value="custom" className="mt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
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
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="predefined" className="mt-4">
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground mb-2">
                  Select a role to login with predefined credentials:
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => loginWithRole("admin")}
                  disabled={loading}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Admin</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    admin@gmail.com
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => loginWithRole("tenant")}
                  disabled={loading}
                >
                  <HomeIcon className="h-4 w-4" />
                  <span>Tenant</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    tenant@gmail.com
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => loginWithRole("landlord")}
                  disabled={loading}
                >
                  <BuildingIcon className="h-4 w-4" />
                  <span>Landlord</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    landlord@gmail.com
                  </span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Register Link */}
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
