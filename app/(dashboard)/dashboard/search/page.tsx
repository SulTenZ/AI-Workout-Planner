// app/(dashboard)/dashboard/search/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Exercise, ProgramExerciseData } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

// --- Komponen-komponen UI untuk kebersihan kode ---

// Komponen untuk input pencarian
const SearchInput = ({ onSearch, loading }: { onSearch: (query: string) => void; loading: boolean; }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };
  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="search" name="search"
          placeholder="Search exercises (e.g., 'bicep curl', 'squat')..."
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

// Komponen untuk menampilkan hasil pencarian
const SearchResults = ({ exercises, onAdd }: { exercises: Exercise[]; onAdd: (ex: Exercise) => void; }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {exercises.map((exercise) => (
      <motion.div
        key={exercise.id}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col"
      >
        <h3 className="text-lg font-bold mb-2 capitalize">{exercise.name}</h3>
        <img src={exercise.gifUrl} alt={exercise.name} className="w-full rounded-md mb-4 border" loading="lazy" />
        <p className="text-sm text-gray-600 capitalize"><strong>Target:</strong> {exercise.target}</p>
        <p className="text-sm text-gray-600 capitalize"><strong>Equipment:</strong> {exercise.equipment}</p>
        <div className="mt-auto pt-4">
          <button onClick={() => onAdd(exercise)} className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
            Add to Program
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);


// --- Komponen Utama Halaman Pencarian ---

export default function SearchPage() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -- STATE UNTUK PROGRAM BUILDER --
  const [programTitle, setProgramTitle] = useState('');
  const [programExercises, setProgramExercises] = useState<ProgramExerciseData[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearchResults([]);
    try {
      const response = await fetch(`/api/exercises/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch exercises.');
      const data = await response.json();
      setSearchResults(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // -- FUNGSI UNTUK MENAMBAH LATIHAN KE PROGRAM --
  const handleAddExercise = (exercise: Exercise) => {
    // Cek agar tidak ada latihan duplikat
    if (programExercises.find(e => e.exerciseId === exercise.id)) {
      alert('Exercise already in the program.');
      return;
    }
    const newExercise: ProgramExerciseData = {
      exerciseId: exercise.id,
      name: exercise.name,
      sets: 3,
      reps: '10-12',
      rest: 60, // in seconds
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      equipment: exercise.equipment,
    };
    setProgramExercises([...programExercises, newExercise]);
  };

  // -- FUNGSI UNTUK MENGHAPUS LATIHAN DARI PROGRAM --
  const handleRemoveExercise = (exerciseId: string) => {
    setProgramExercises(programExercises.filter(e => e.exerciseId !== exerciseId));
  };
  
  // -- FUNGSI UNTUK MENYIMPAN PROGRAM KE DATABASE --
  const handleSaveProgram = async () => {
    if (!programTitle.trim()) {
      alert('Please enter a title for your program.');
      return;
    }
    if (programExercises.length === 0) {
      alert('Please add at least one exercise to your program.');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: programTitle, exercises: programExercises }),
      });
      if (!response.ok) throw new Error('Failed to save program.');
      
      alert('Program saved successfully!');
      // Reset builder
      setProgramTitle('');
      setProgramExercises([]);
      router.push('/dashboard/programs'); // Arahkan ke halaman program
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Pencarian & Hasil */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Exercises</h1>
        <SearchInput onSearch={handleSearch} loading={loading} />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <AnimatePresence>
          {searchResults.length > 0 && <SearchResults exercises={searchResults} onAdd={handleAddExercise} />}
        </AnimatePresence>
      </div>

      {/* Kolom Kanan: Program Builder */}
      <div className="lg:col-span-1">
        <div className="sticky top-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Program Builder</h2>
          <div className="mb-4">
            <label htmlFor="programTitle" className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
            <input
              type="text"
              id="programTitle"
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
              placeholder="e.g., Push Day, Leg Annihilation"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            <AnimatePresence>
              {programExercises.map((ex, index) => (
                <motion.div 
                  key={ex.exerciseId}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3 bg-gray-50 rounded-md border"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold capitalize text-sm">{ex.name}</p>
                    <button onClick={() => handleRemoveExercise(ex.exerciseId)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                  </div>
                   {/* TODO: Add inputs for sets, reps, rest here */}
                </motion.div>
              ))}
            </AnimatePresence>
            {programExercises.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Add exercises from the search results to get started.</p>}
          </div>
          <button
            onClick={handleSaveProgram}
            disabled={isSaving}
            className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSaving ? 'Saving...' : 'Save Program'}
          </button>
        </div>
      </div>
    </div>
  );
}