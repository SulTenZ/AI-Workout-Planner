// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Search Exercises', href: '/dashboard/search' },
  { name: 'My Programs', href: '/dashboard/programs' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b">
          <h1 className="text-xl font-bold text-blue-600">AI Planner</h1>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === link.href
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}