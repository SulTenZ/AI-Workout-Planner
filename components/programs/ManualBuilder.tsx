// components/programs/ManualBuilder.tsx
'use client';
// ... (import state, dll)

export default function ManualBuilder({ onBack }: { onBack: () => void }) {
    return (
        <div>
            <button onClick={onBack} className="mb-4 text-sm text-gray-600 hover:underline">
                &larr; Kembali ke pilihan mode
            </button>
            <h2 className="text-2xl font-bold">Manual Program Builder</h2>
            <p className="text-gray-500 mt-1">
                Di sini, Anda bisa mengintegrasikan logika dari halaman `/search` yang lama,
                termasuk pencarian exercise dan program builder di sisi kanan.
            </p>
            {/* Tempatkan logika dan UI dari search/page.tsx di sini */}
        </div>
    );
}