
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: ReactNode; // Kita bisa gunakan emoji atau komponen SVG
  className?: string;
}

export default function Card({ title, value, icon, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md flex items-center ${className}`}>
      <div className="p-3 bg-blue-100 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}