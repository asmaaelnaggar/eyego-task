"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); 

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/users", label: "Users" },
    { href: "/dashboard/reports", label: "Reports" },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Eyego</h2>
      <nav className="flex flex-col gap-4">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded ${
                isActive 
                  ? "font-bold bg-blue-100 text-blue-700" // style for active page
                  : "hover:text-blue-500"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}