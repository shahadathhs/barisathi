import { Separator } from "@/components/ui/separator";

export default function PolicyPageContactSection() {
  return (
    <div>
      <Separator className="my-8" />

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at{" "}
          <a
            href="mailto:privacy@barisathi.com"
            className="text-primary hover:underline"
          >
            privacy@barisathi.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
