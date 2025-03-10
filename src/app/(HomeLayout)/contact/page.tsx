"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // Here you can integrate with your contact API or email service.
    console.log("Contact Form Submitted:", data);
    alert("Thank you for reaching out! We will get back to you soon.");
    reset();
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-xl mx-auto">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Have questions or need assistance? Fill out the form below and our
          team will get in touch with you shortly.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2">
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
            <Label htmlFor="message" className="mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Your Message"
              {...register("message", { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </section>
    </main>
  );
}
