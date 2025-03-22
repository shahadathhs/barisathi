import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <span className="text-md font-bold italic">BARISATHI</span>
      </div>
    </Link>
  );
}
