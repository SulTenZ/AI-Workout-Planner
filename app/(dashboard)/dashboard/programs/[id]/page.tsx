// app/(dashboard)/dashboard/programs/[id]/page.tsx
import { getProgramById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Komponen terpisah untuk tombol hapus agar bisa jadi Client Component
import DeleteProgramButton from '@/components/programs/DeleteProgramButton';

export default async function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = await getProgramById(params.id);

  // Jika program tidak ditemukan atau bukan milik user, tampilkan halaman 404
  if (!program) {
    notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link href="/dashboard/programs/list" className="text-sm text-gray-500 hover:underline mb-2 block">
            &larr; Back to My Programs
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">{program.title}</h1>
          <p className="text-gray-500 mt-1">
            Created on: {new Date(program.createdAt).toLocaleDateString()}
          </p>
        </div>
        <DeleteProgramButton programId={program.id} />
      </div>

      <div className="mt-8 space-y-6">
        {program.exercises.map((exercise, index) => (
          <div key={exercise.id} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border">
            {exercise.gifUrl && (
              <img 
                src={exercise.gifUrl} 
                alt={exercise.name} 
                className="w-full md:w-40 md:h-40 object-cover rounded-md bg-gray-200"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold capitalize text-gray-800">{index + 1}. {exercise.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 mt-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Sets:</span>
                  <span className="ml-2 text-gray-800">{exercise.sets}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Reps:</span>
                  <span className="ml-2 text-gray-800">{exercise.reps}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Rest:</span>
                  <span className="ml-2 text-gray-800">{exercise.rest} seconds</span>
                </div>
                {exercise.target && 
                  <div className="capitalize">
                    <span className="font-semibold text-gray-600">Target:</span>
                    <span className="ml-2 text-gray-800">{exercise.target}</span>
                  </div>
                }
                 {exercise.equipment && 
                  <div className="capitalize">
                    <span className="font-semibold text-gray-600">Equipment:</span>
                    <span className="ml-2 text-gray-800">{exercise.equipment}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}