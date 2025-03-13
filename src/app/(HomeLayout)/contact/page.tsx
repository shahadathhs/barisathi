"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { toast } from "sonner";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();
  const [loading, setLoading] = useState(false);

  const sendContactEmail = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setLoading(false);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.error("Error sending email:", error);
      return { success: false, message: "Something went wrong" };
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    const result = await sendContactEmail(data);
    if (result.success) {
      toast("Thank you for reaching out! We will get back to you soon.", {
        description: "We will get back to you soon.",
        position: "top-right",
        duration: 5000,
        icon: "🎉",
      });
      reset();
    } else {
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        duration: 5000,
        icon: "🚨",
      });
    }
  };

  return (
    <main className="min-h-screen py-8 md:py-16 px-4 md:px-8 lg:px-12 max-w-xl mx-auto">
      {/* Contact Info Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Have questions or need assistance? We&apos;re here to help.
        </p>
        <div className="flex flex-col items-center gap-2">
          {/* Office Address and Contact Number */}
          <div className="text-center">
            <p className="text-gray-600">
              <strong>Office:</strong> 123 Main Street, City, Country
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +1 234 567 890
            </p>
          </div>
          {/* Social Links */}
          <SocialLinks color="text-gray-600" hoverColor="text-primary" />
        </div>
      </section>

      {/* Contact Form Section */}
      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name" className="mb-2 block">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2 block">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Your Message"
              {...register("message", { required: true })}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>
    </main>
  );
}
