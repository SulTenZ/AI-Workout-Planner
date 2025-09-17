import { getUserPrograms } from '@/lib/data';
import Link from 'next/link';
import Card from '@/components/dashboard/Card'; // Impor komponen Card baru kita

export default async function DashboardPage() {
  const programs = await getUserPrograms();
  const totalPrograms = programs.length;
  // Menghitung total exercises dari semua program
  const totalExercises = programs.reduce((acc, program) => acc + (program._count?.exercises || 0), 0);

  // Mengambil 3 program terbaru untuk ditampilkan
  const recentPrograms = programs.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard!</h1>
        <p className="mt-1 text-gray-600">Here's a summary of your workout journey.</p>
      </div>
      
      {/* Bagian Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Total Programs Created"
          value={totalPrograms}
          icon={<span className="text-2xl">🗂️</span>} // Emoji sebagai ikon
        />
        <Card 
          title="Total Exercises Logged"
          value={totalExercises}
          icon={<span className="text-2xl">💪</span>}
        />
        {/* Anda bisa menambahkan card lain di sini, misalnya "Workout Streak" */}
      </div>

      {/* Bagian Program Terbaru */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Recent Programs</h2>
            <Link href="/dashboard/programs/list" className="text-sm font-medium text-blue-600 hover:underline">
                View All
            </Link>
        </div>
        {recentPrograms.length > 0 ? (
          <div className="space-y-4">
            {recentPrograms.map(program => (
              <Link 
                key={program.id}
                href={`/dashboard/programs/${program.id}`}
                className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-800">{program.title}</h3>
                  <span className="text-sm text-gray-500">
                    {program._count.exercises} {program._count.exercises === 1 ? 'exercise' : 'exercises'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-8 rounded-lg shadow-sm border">
            <p className="text-gray-600">You haven't created any programs yet.</p>
            <Link href="/dashboard/programs" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              Create Your First Program
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}