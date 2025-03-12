interface SectionCardProps {
  title: string;
  description: string;
}

export default function WhyJoinUsCard({
  title,
  description,
}: SectionCardProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
