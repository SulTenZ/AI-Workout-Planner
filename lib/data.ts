// lib/data.ts
import 'server-only'; // Memastikan kode ini hanya berjalan di server
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function getUserPrograms() {
  const session = await auth();
  if (!session?.user?.id) {
    // Di Server Component, lebih baik return array kosong atau throw error
    // daripada mengembalikan response JSON.
    return []; 
  }

  try {
    const programs = await prisma.program.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        // Hitung jumlah exercise untuk setiap program
        _count: {
          select: { exercises: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return programs;
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    // Di aplikasi production, Anda mungkin ingin handle error ini lebih baik
    return [];
  }
}