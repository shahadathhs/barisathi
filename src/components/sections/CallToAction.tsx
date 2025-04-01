import Link from "next/link";
import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4">
      <div className="shadow border rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Property Owner?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          List your property on BariSathi and connect with thousands of
          potential tenants.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/post-rental-house">Post Your Rental House Now</Link>
        </Button>
      </div>
    </section>
  );
}
