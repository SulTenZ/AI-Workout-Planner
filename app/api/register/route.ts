// app/api/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // FIX: Path impor yang benar
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    return NextResponse.json(
      {
        user: { id: newUser.id, email: newUser.email },
        message: "User created successfully. Please log in.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // FIX: Memberikan response error yang lebih informatif
      return NextResponse.json(
        { message: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Register API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
