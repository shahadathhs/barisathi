import { Button } from "@/components/ui/button";
import { AnimatedTestimonialsDemo } from "@/ui/AnimatedTestimonialsDemo";
import { MarqueeDemo } from "@/ui/MarqueeDemo";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <div className="w-full h-screen flex justify-center items-center">
        <MarqueeDemo />
      </div>
      <AnimatedTestimonialsDemo />
    </div>
  );
}
