// components/programs/DeleteProgramButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteProgramButton({ programId }: { programId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Minta konfirmasi dari user
    const confirmed = window.confirm("Are you sure you want to delete this program? This action cannot be undone.");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the program.');
      }

      alert('Program deleted successfully!');
      // Arahkan kembali ke daftar program dan refresh data
      router.push('/dashboard/programs/list');
      router.refresh(); 

    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the program.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-red-300"
    >
      {isDeleting ? 'Deleting...' : 'Delete Program'}
    </button>
  );
}