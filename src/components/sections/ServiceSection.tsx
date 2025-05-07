import { Users, Building, Home } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const services = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "For Tenants",
    description:
      "Find your ideal rental home and manage your tenancy with ease.",
    features: [
      "Search verified rental listings",
      "Schedule viewings online",
      "Submit rental applications",
      "Pay rent securely",
      "Request maintenance",
    ],
  },
  {
    icon: <Building className="h-6 w-6 text-primary" />,
    title: "For Landlords",
    description: "Manage your properties and tenants efficiently in one place.",
    features: [
      "List and market properties",
      "Screen potential tenants",
      "Collect rent automatically",
      "Track maintenance requests",
      "Generate financial reports",
    ],
  },
  {
    icon: <Home className="h-6 w-6 text-primary" />,
    title: "For Administrators",
    description: "Oversee the entire platform and ensure smooth operations.",
    features: [
      "Monitor all listings",
      "Verify users and properties",
      "Resolve disputes",
      "Generate platform analytics",
      "Manage system settings",
    ],
  },
];

export default function ServiceSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Connecting Everyone in Rental Housing
        </h2>
        <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
          Our platform serves the needs of tenants, landlords, and property
          managers with specialized tools and resources.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className={`flex flex-col ${
              service.title === "For Administrators"
                ? "sm:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                {service.icon}
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
            </CardContent>
            {/* <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </section>
  );
}
