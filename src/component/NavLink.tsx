"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavMenu = {
  inactiveIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
  title: string;
};

export default function NavLink({
  menu: { inactiveIcon, activeIcon, path, title },
}: {
  menu: NavMenu;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={`${path}`}
      className={`flex items-center gap-3 p-2 rounded-md
      hover:bg-orange-50 group transition-all ${
        pathname === path && "text-orange-500 font-semibold"
      }`}
    >
      <div className="text-3xl transition-transform group-hover:scale-105">
        {pathname === path ? activeIcon : inactiveIcon}
      </div>
      <span className="hidden scale-100 lg:block">{title}</span>
    </Link>
  );
}
