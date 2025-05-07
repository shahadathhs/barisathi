import { Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const howItWorksData = [
  {
    title: "For Tenants",
    icon: <Users className="h-6 w-6 text-primary" />,
    steps: [
      {
        title: "Search Available Properties",
        description:
          "Browse our extensive listing of verified rental properties with detailed filters.",
      },
      {
        title: "Schedule Viewings",
        description:
          "Book property viewings directly through our platform at your convenience.",
      },
      {
        title: "Apply Online",
        description:
          "Submit your rental application and necessary documents securely online.",
      },
      {
        title: "Move In & Manage",
        description:
          "Sign your lease digitally, pay rent online, and submit maintenance requests easily.",
      },
    ],
    cta: {
      label: "Find Your Rental Home",
      variant: "default",
      href: "/rental-house",
    },
  },
  {
    title: "For Landlords",
    icon: <Building className="h-6 w-6 text-primary" />,
    steps: [
      {
        title: "List Your Property",
        description:
          "Create detailed listings with photos, amenities, and rental terms in minutes.",
      },
      {
        title: "Screen Potential Tenants",
        description:
          "Review applications with background and credit checks for qualified tenants.",
      },
      {
        title: "Digital Leasing",
        description:
          "Generate and sign lease agreements electronically with built-in templates.",
      },
      {
        title: "Manage & Collect",
        description:
          "Collect rent automatically, track expenses, and handle maintenance requests.",
      },
    ],
    cta: {
      label: "List Your Property",
      variant: "outline",
      href: "/post-rental-house",
    },
  },
];

export default function HowItWorksSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          How It Works
        </h2>
        <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
          Our platform makes the rental process simple and efficient for
          everyone involved.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {howItWorksData.map((group, idx) => (
          <div key={idx} className="space-y-8">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg">
              {group.icon}
            </div>
            <h3 className="text-2xl font-bold">{group.title}</h3>

            <div className="space-y-6">
              {group.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {stepIdx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href={group.cta.href}>
              <Button
                variant={group.cta.variant as "outline"}
                className="w-full sm:w-auto"
              >
                {group.cta.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
