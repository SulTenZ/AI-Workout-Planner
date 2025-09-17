// app/(dashboard)/dashboard/programs/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProgramsPage() {
  const router = useRouter();

  // Fungsi untuk menampilkan daftar program yang sudah ada
  const viewSavedPrograms = () => {
    // Kita akan buat halaman ini nanti
    router.push('/dashboard/programs/list'); 
  };
  
  // Fungsi untuk masuk ke alur pembuatan program baru
  const createNewProgram = () => {
    router.push('/dashboard/programs/new');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Workout Programs</h1>
        <button 
          onClick={viewSavedPrograms} 
          className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
        >
          View Saved Programs
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 text-center">
        {/* Menggunakan onClick untuk navigasi */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createNewProgram}
          className="w-full md:w-96 h-80 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center p-6 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
        >
          <h2 className="text-3xl font-bold text-gray-800">Create a New Plan</h2>
          <p className="mt-2 text-gray-500">Design your next workout program, either manually or with the help of our AI.</p>
        </motion.div>
      </div>
    </div>
  );
}