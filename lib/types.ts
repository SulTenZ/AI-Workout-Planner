// lib/types.ts

// Tipe data dari ExerciseDB API
export interface Exercise {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
}

// Tipe data untuk program exercise di DB kita
export interface ProgramExerciseData {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  gifUrl?: string;
  target?: string;
  equipment?: string;
}