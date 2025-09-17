// components/programs/AiBuilder.tsx
'use client';
// ... (import state, dll)

export default function AiBuilder({ onBack }: { onBack: () => void }) {
     return (
        <div>
            <button onClick={onBack} className="mb-4 text-sm text-gray-600 hover:underline">
                &larr; Kembali ke pilihan mode
            </button>
            <h2 className="text-2xl font-bold">AI Program Generator</h2>
            <p className="text-gray-500 mt-1">
                Implementasikan form wizard step-by-step di sini untuk menanyakan
                hari, prioritas otot, dan peralatan yang tersedia.
            </p>
            {/* Tempatkan form wizard AI di sini */}
        </div>
    );
}