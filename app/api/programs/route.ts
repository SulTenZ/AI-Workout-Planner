// app/api/programs/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // <-- Ganti impor ke sini
import prisma from "@/lib/prisma";
import { z } from "zod";

const programSchema = z.object({
  title: z.string().min(1, "Title is required"),
  exercises: z
    .array(
      z.object({
        exerciseId: z.string(),
        name: z.string(),
        sets: z.number().min(1),
        reps: z.string(),
        rest: z.number().min(0),
        gifUrl: z.string().optional(),
        target: z.string().optional(),
        equipment: z.string().optional(),
      })
    )
    .min(1, "At least one exercise is required"),
});

// GET all programs for the logged-in user
export async function GET() {
  const session = await auth(); // <-- Gunakan auth() untuk mendapatkan sesi

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const programs = await prisma.program.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        exercises: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

// POST a new program for the logged-in user
export async function POST(request: Request) {
  const session = await auth(); // <-- Gunakan auth() untuk mendapatkan sesi

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, exercises } = programSchema.parse(body);

    const newProgram = await prisma.program.create({
      data: {
        title,
        userId: session.user.id,
        exercises: {
          create: exercises,
        },
      },
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create program" },
      { status: 500 }
    );
  }
}
