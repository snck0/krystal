import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Uživatelské jméno a heslo jsou povinné' }, { status: 400 });
    }

    if (username.length < 1) {
      return NextResponse.json({ error: 'Uživatelské jméno nesmí být prázdné' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Heslo musí mít alespoň 6 znaků' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: 'Toto uživatelské jméno je již obsazeno' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    return NextResponse.json({ message: 'Účet vytvořen', userId: user.id }, { status: 201 });

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Chyba serveru, zkus to znovu' }, { status: 500 });
  }
}
