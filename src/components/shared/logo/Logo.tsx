import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Logo({ textColor = "text-primary" }: { textColor?: string }) {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Image src={logo} alt="Logo" width={60} height={60} />
        <span className={`text-xl font-bold italic ${textColor}`}>BARISATHI</span>
      </div>
    </Link>
  );
}
