import Link from "next/link";


// Reusable SidebarLink component
interface SidebarLinkProps {
  name: string;
  href: string;
  onClick: () => void;
}

export function SidebarLink({ name, href, onClick }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="p-2 text-xs rounded-md border hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {name}
    </Link>
  );
}