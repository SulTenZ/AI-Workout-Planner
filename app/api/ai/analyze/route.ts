// app/api/ai/analyze/route.ts
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { z } from "zod";
import { ProgramExerciseData } from "@/lib/types";

// Konfigurasi Replicate SDK
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const analyzeSchema = z.object({
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.number(),
      reps: z.string(),
    })
  ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exercises } = analyzeSchema.parse(body);

    const exerciseList = exercises
      .map((e) => `${e.name}: ${e.sets} sets of ${e.reps} reps`)
      .join("\n");

    // Prompt untuk IBM Granite AI (atau model lain yang kompatibel)
    const prompt = `
      You are an expert fitness coach and sports scientist.
      Analyze the following workout program for potential muscle imbalances, overtraining risk, and overall structure.
      Provide concise, actionable feedback.
      Your feedback should be structured as JSON with two keys: "balanceFeedback" (string) and "suggestions" (an array of strings).
      
      Workout Program:
      ${exerciseList}
    `;

    // Pastikan identifier model Anda sesuai
    const modelIdentifier = process.env
      .AI_MODEL_IDENTIFIER as `${string}/${string}`;
    console.log(`Running prediction with model: ${modelIdentifier}`);

    const output = await replicate.run(modelIdentifier, {
      input: {
        prompt: prompt,
        // Parameter lain mungkin diperlukan tergantung modelnya
        // max_new_tokens: 250,
      },
    });

    // Output dari model LLM adalah array of strings
    const rawOutput = (output as string[]).join("");

    // Coba parsing JSON dari output AI
    let analysisResult;
    try {
      // AI mungkin mengembalikan teks markdown dengan blok kode JSON
      const jsonMatch = rawOutput.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        analysisResult = JSON.parse(jsonMatch[1]);
      } else {
        analysisResult = JSON.parse(rawOutput);
      }
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", rawOutput);
      // Fallback jika parsing gagal
      analysisResult = {
        balanceFeedback:
          "Could not automatically analyze. Please review manually.",
        suggestions: [rawOutput],
      };
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "An error occurred during AI analysis." },
      { status: 500 }
    );
  }
}
