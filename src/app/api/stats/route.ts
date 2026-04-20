import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET – load user stats
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nepřihlášen' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      games: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  });

  if (!user) return NextResponse.json({ error: 'Uživatel nenalezen' }, { status: 404 });

  return NextResponse.json({
    games: user.games.map(g => ({
      word: g.word,
      attempts: g.attempts,
      points: g.points,
      isWin: g.isWin,
      date: g.createdAt.toISOString(),
    })),
    currentStreak: user.currentStreak,
    maxStreak: user.maxStreak,
  });
}

// POST – save game result
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nepřihlášen' }, { status: 401 });
  }

  const { word, attempts, points, isWin } = await req.json();

  // Save game
  await prisma.game.create({
    data: {
      userId: session.user.id,
      word,
      attempts,
      points,
      isWin,
    },
  });

  // Update streak
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: 'Uživatel nenalezen' }, { status: 404 });

  const newStreak = isWin ? user.currentStreak + 1 : 0;
  const newMaxStreak = Math.max(user.maxStreak, newStreak);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { currentStreak: newStreak, maxStreak: newMaxStreak },
  });

  return NextResponse.json({ message: 'Výsledek uložen', streak: newStreak });
}
