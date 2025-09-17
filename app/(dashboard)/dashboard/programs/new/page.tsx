// app/(dashboard)/dashboard/programs/new/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChoiceScreen from '@/components/programs/ChoiceScreen';
import ManualBuilder from '@/components/programs/ManualBuilder';
import AiBuilder from '@/components/programs/AiBuilder';

type BuilderMode = 'choice' | 'manual' | 'ai';

export default function NewProgramPage() {
  const [mode, setMode] = useState<BuilderMode>('choice');

  const renderContent = () => {
    switch (mode) {
      case 'manual':
        // Tambahkan prop untuk kembali ke halaman pilihan
        return <ManualBuilder onBack={() => setMode('choice')} />;
      case 'ai':
        return <AiBuilder onBack={() => setMode('choice')} />;
      case 'choice':
      default:
        return <ChoiceScreen onSelectMode={setMode} />;
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}