// components/programs/ChoiceScreen.tsx
'use client';
import { motion } from 'framer-motion';

interface ChoiceScreenProps {
  onSelectMode: (mode: 'manual' | 'ai') => void;
}

export default function ChoiceScreen({ onSelectMode }: ChoiceScreenProps) {
  return (
    <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">How would you like to start?</h1>
        <p className="text-gray-500 mt-2">Choose a path to build your perfect workout plan.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
            <motion.div
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-full md:w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6 cursor-pointer"
                onClick={() => onSelectMode('manual')}
            >
                <h2 className="text-2xl font-bold text-gray-800">Buat Rencana Sendiri</h2>
                <p className="mt-2 text-gray-500">Take full control and design your program from scratch.</p>
            </motion.div>
            
            <motion.div
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-full md:w-80 h-96 bg-blue-600 text-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6 cursor-pointer"
                onClick={() => onSelectMode('ai')}
            >
                <h2 className="text-2xl font-bold">Tanya AthleTech AI</h2>
                <p className="mt-2 text-blue-100">Let our AI generate a personalized plan for you.</p>
            </motion.div>
        </div>
    </div>
  );
}