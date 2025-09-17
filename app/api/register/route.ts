import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Perbarui skema Zod dengan validasi konfirmasi password
const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Menunjukkan error pada field confirmPassword
});


export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 'confirmPassword' divalidasi oleh Zod, tapi tidak perlu disimpan
    const { name, email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      message: 'User created successfully. Please log in.',
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", details: error.issues }, { status: 400 });
    }
    console.error("Register API Error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}