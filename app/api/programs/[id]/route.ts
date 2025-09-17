// app/api/programs/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const programId = params.id;

  try {
    // Pastikan program yang akan dihapus adalah milik user yang sedang login
    const program = await prisma.program.findFirst({
      where: {
        id: programId,
        userId: session.user.id,
      },
    });

    if (!program) {
      return NextResponse.json({ message: 'Program not found or you do not have permission to delete it' }, { status: 404 });
    }
    
    // Prisma akan otomatis menghapus semua 'ProgramExercise' terkait karena 'onDelete: Cascade'
    await prisma.program.delete({
      where: { id: programId },
    });

    return NextResponse.json({ message: 'Program deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete program:", error);
    return NextResponse.json({ message: 'Failed to delete program' }, { status: 500 });
  }
}