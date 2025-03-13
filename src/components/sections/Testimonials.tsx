import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { testimonials } from "@/constant/testimonials";

export default function Testimonials() {
  return (
    <section className="pt-16">
      <h2 className="text-3xl font-bold text-center">
        What Our Customers Say
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
