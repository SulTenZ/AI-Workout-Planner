// app/(dashboard)/dashboard/programs/list/page.tsx
import { getUserPrograms } from '@/lib/data';
import Link from 'next/link';

// Konten file ini sama persis dengan file /programs/page.tsx Anda yang lama.
// Kita hanya memindahkannya ke rute baru.
export default async function ProgramsListPage() {
  const programs = await getUserPrograms();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Saved Programs</h1>
        <Link href="/dashboard/programs" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          + Create New Program
        </Link>
      </div>
      
      {programs.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">You haven't created any programs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Link 
              key={program.id} 
              href={`/dashboard/programs/${program.id}`}
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
            >
              <h2 className="text-xl font-bold text-gray-800">{program.title}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {program._count.exercises} {program._count.exercises === 1 ? 'exercise' : 'exercises'}
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Created on: {new Date(program.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}