interface PolicySectionProps {
  title: string;
  content: string;
}

export default function PolicyCard({
  title,
  content,
}: PolicySectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mt-8 mb-4">{title}</h2>
      <p className="text-lg text-gray-700 mb-4">{content}</p>
    </section>
  );
}
