import Link from "next/link";

export default function HeroSection() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to BariSathi
      </h1>
      <p className="text-lg text-center mb-12">
        Discover the best places to stay in Bangladesh
      </p>
      <div className="flex justify-center">
        <Link
          href="/post-rental-house"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-200"
        >
          Post a Rental Request
        </Link>
      </div>
    </section>
  );
}
